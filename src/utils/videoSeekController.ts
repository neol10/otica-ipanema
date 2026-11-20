/**
 * VideoSeekController — sincroniza `video.currentTime` com o progresso do scroll.
 *
 * Princípios (hotfix dos travamentos do Hero):
 *  - Mantém SOMENTE o destino mais recente (nunca uma fila de seeks antigos).
 *  - Nunca bloqueia o scroll: roda em requestAnimationFrame, fora do fluxo de scroll.
 *  - Nunca depende exclusivamente do evento `seeked`: um watchdog reemite o destino
 *    mais recente se o seek em andamento demorar demais.
 *  - Não cria espera infinita: se o seek ficar preso, desiste até o próximo scroll.
 *  - O destino é guardado como PROGRESSO (0..1); a conversão para segundos usa a
 *    duração real, que pode chegar depois (loadedmetadata).
 */

export interface SeekableVideo {
  currentTime: number;
  readonly duration: number;
  readonly seeking: boolean;
  readonly readyState: number;
}

export interface SeekStats {
  issued: number;
  completed: number;
  staleRetries: number;
  giveUps: number;
  skippedRedundant: number;
  presentedFrames: number;
  lastLatencyMs: number;
  avgLatencyMs: number;
  maxLatencyMs: number;
}

export interface SeekControllerOptions {
  /** Diferença mínima (s) que justifica um novo seek (~meio frame a 24fps = 0.022s). */
  epsilon?: number;
  /** Seek em andamento há mais que isso (ms) é considerado obsoleto: reemite o destino atual. */
  retryMs?: number;
  /** Seek para o MESMO destino sem concluir por tanto tempo (ms): reemite uma vez e desiste. */
  giveUpMs?: number;
  /** Margem final para evitar seek exatamente em `duration` (alguns navegadores exibem preto). */
  tailGuard?: number;
  now?: () => number;
  schedule?: (cb: () => void) => number;
  cancel?: (id: number) => void;
}

export class VideoSeekController {
  readonly stats: SeekStats = {
    issued: 0,
    completed: 0,
    staleRetries: 0,
    giveUps: 0,
    skippedRedundant: 0,
    presentedFrames: 0,
    lastLatencyMs: 0,
    avgLatencyMs: 0,
    maxLatencyMs: 0,
  };

  private progress = 0;
  private requested: number | null = null;
  private issuedAt = 0;
  private latencySum = 0;
  private reissued = false;
  private frame: number | null = null;

  private readonly epsilon: number;
  private readonly retryMs: number;
  private readonly giveUpMs: number;
  private readonly tailGuard: number;
  private readonly now: () => number;
  private readonly scheduleFn: (cb: () => void) => number;
  private readonly cancelFn: (id: number) => void;

  constructor(
    private readonly getVideo: () => SeekableVideo | null,
    options: SeekControllerOptions = {}
  ) {
    this.epsilon = options.epsilon ?? 0.022;
    this.retryMs = options.retryMs ?? 150;
    this.giveUpMs = options.giveUpMs ?? 2000;
    this.tailGuard = options.tailGuard ?? 0.045;
    this.now = options.now ?? (() => performance.now());
    this.scheduleFn = options.schedule ?? ((cb) => requestAnimationFrame(cb));
    this.cancelFn = options.cancel ?? ((id) => cancelAnimationFrame(id));
  }

  /** Registra o destino mais recente (progresso 0..1). Barato: chamado a cada tick do scroll. */
  request(progress: number): void {
    this.progress = Math.max(0, Math.min(1, progress));
    this.reissued = false;
    this.schedule();
  }

  /** Reavalia o destino atual (ex.: após loadedmetadata / volta de aba). */
  flush(): void {
    this.schedule();
  }

  /** Registra conclusão de um seek (evento `seeked`), mede latência real e reavalia se há destino pendente. */
  notifySeeked(): void {
    if (this.issuedAt > 0) {
      const latency = Math.max(0, this.now() - this.issuedAt);
      this.stats.completed += 1;
      this.stats.lastLatencyMs = Number(latency.toFixed(1));
      this.latencySum += latency;
      this.stats.avgLatencyMs = Number((this.latencySum / this.stats.completed).toFixed(1));
      if (latency > this.stats.maxLatencyMs) {
        this.stats.maxLatencyMs = Number(latency.toFixed(1));
      }
      this.issuedAt = 0;
    }
    this.schedule();
  }

  /** Incrementa contador de frames efetivamente apresentados (requestVideoFrameCallback). */
  notifyFramePresented(): void {
    this.stats.presentedFrames += 1;
  }

  /** Esquece o último seek emitido (ex.: o elemento <video> foi trocado/recarregado). */
  reset(): void {
    this.requested = null;
    this.issuedAt = 0;
    this.reissued = false;
  }

  /** Cancela o frame pendente. O controlador continua utilizável (StrictMode remonta). */
  cancel(): void {
    if (this.frame !== null) {
      this.cancelFn(this.frame);
      this.frame = null;
    }
  }

  getProgress(): number {
    return this.progress;
  }

  getRequestedTime(): number | null {
    return this.requested;
  }

  private schedule(): void {
    if (this.frame !== null) return;
    this.frame = this.scheduleFn(this.tick);
  }

  private issue(video: SeekableVideo, target: number, now: number): void {
    // Marcamos como solicitado ANTES de escrever: se a escrita lançar
    // (InvalidStateError) não entramos em laço quente de tentativas.
    this.requested = target;
    this.issuedAt = now;
    this.stats.issued += 1;
    try {
      video.currentTime = target;
    } catch {
      /* readyState insuficiente: o próximo flush() (loadedmetadata) reavalia */
    }
  }

  private tick = (): void => {
    this.frame = null;
    const video = this.getVideo();
    if (!video) return;

    const duration = video.duration;
    // Sem metadata/duração válida: não seeka e não espera ativamente.
    // O flush() disparado por loadedmetadata/loadeddata retoma o trabalho.
    if (!Number.isFinite(duration) || duration <= 0 || video.readyState < 1) return;

    const target = Math.max(0, Math.min(this.progress * duration, duration - this.tailGuard));
    const now = this.now();

    // Já está no quadro certo (ex.: primeiro quadro com progresso 0): não faz seek redundante.
    if (!video.seeking && Math.abs(video.currentTime - target) < this.epsilon) {
      this.requested = target;
      this.stats.skippedRedundant += 1;
      return;
    }

    const changed = this.requested === null || Math.abs(this.requested - target) >= this.epsilon;

    // Seek concluído para este destino (mesmo que o navegador tenha ajustado ao quadro).
    if (!video.seeking && !changed) return;

    if (changed) {
      if (!video.seeking) {
        this.issue(video, target, now);
      } else if (this.issuedAt > 0 && now - this.issuedAt >= this.retryMs) {
        // Seek em andamento ficou obsoleto/lento: substitui pelo destino MAIS RECENTE.
        this.stats.staleRetries += 1;
        this.issue(video, target, now);
      }
    } else if (this.issuedAt > 0 && now - this.issuedAt >= this.giveUpMs) {
      // Mesmo destino, seek não conclui (rede/decode). Reemite uma vez e depois desiste;
      // um novo request() (scroll) reinicia o ciclo. Nunca espera para sempre.
      if (this.reissued) {
        this.stats.giveUps += 1;
        return;
      }
      this.reissued = true;
      this.issue(video, target, now);
    }

    this.schedule();
  };
}
