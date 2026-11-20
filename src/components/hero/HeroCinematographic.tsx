import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroOverlay } from './HeroOverlay';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useHeroDebug } from '../../hooks/useHeroDebug';
import { isMobileViewport, isLowPowerModeRecommended } from '../../utils/device';
import { VideoSeekController } from '../../utils/videoSeekController';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Distâncias de rolagem cinematográficas responsivas (calibradas para 10s a 24fps):
 * - Desktop (>= 1024px): 3600px
 * - Tablet (768px - 1023px): 3000px
 * - Mobile (< 768px): 2400px
 */
function getHeroScrollDistance(): number {
  if (typeof window === 'undefined') return 3600;
  const width = window.innerWidth;
  if (width < 768) return 2400;
  if (width < 1024) return 3000;
  return 3600;
}

/** Máximo de recarregamentos do vídeo após erro de mídia antes de cair no modo estático. */
const MAX_MEDIA_RETRIES = 2;

type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
  cancelVideoFrameCallback?: (id: number) => void;
};

export const HeroCinematographic: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollDistance, setScrollDistance] = useState<number>(() => getHeroScrollDistance());
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const [hasMediaError, setHasMediaError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => isMobileViewport());
  const [isLowPower] = useState<boolean>(() => isLowPowerModeRecommended());
  const prefersReducedMotion = useReducedMotion();

  // Controlador de seeking: mantém apenas o destino mais recente, nunca bloqueia o scroll.
  const [seek] = useState(() => new VideoSeekController(() => videoRef.current));
  const renderedProgressRef = useRef<number>(0);
  const mediaRetriesRef = useRef<number>(0);

  const staticMode = prefersReducedMotion
    ? 'static-reduced-motion'
    : isLowPower
      ? 'static-save-data'
      : hasMediaError
        ? 'static-error'
        : null;

  // Instrumentação de diagnóstico (HUD somente em DEV; snapshot via ?heroDebug=1 ou DEV)
  const debug = useHeroDebug(videoRef, seek, staticMode ?? 'video');

  // Assets otimizados da Óticas Ipanema (derivados do master hero cinematografico.mp4)
  const videoSrc = isMobile
    ? '/assets/video/ipanema-hero-mobile.mp4'
    : '/assets/video/ipanema-hero-desktop.mp4';

  const posterSrc = isMobile
    ? '/assets/images/hero/ipanema-hero-poster-mobile.webp'
    : '/assets/images/hero/ipanema-hero-poster-desktop.webp';

  const finalPosterSrc = isMobile
    ? '/assets/images/hero/ipanema-hero-final-mobile.webp'
    : '/assets/images/hero/ipanema-hero-final-desktop.webp';

  const isVideoReady = readySrc === videoSrc;

  // Resize com debounce: atualiza distância/viewport sem forçar ScrollTrigger.refresh() em loop.
  useEffect(() => {
    let timer: number | undefined;
    const apply = () => {
      setScrollDistance(getHeroScrollDistance());
      setIsMobile(isMobileViewport());
    };
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(apply, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Ciclo de vida do controlador: cancela rAF pendente ao desmontar e retoma ao voltar à aba.
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') seek.flush();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      seek.cancel();
    };
  }, [seek]);

  // Monitoramento real de frames apresentados via requestVideoFrameCallback (quando suportado)
  useEffect(() => {
    if (staticMode) return;
    const video = videoRef.current as VideoWithRVFC | null;
    if (!video || typeof video.requestVideoFrameCallback !== 'function') return;

    let active = true;
    let handle = 0;
    const onFrame = () => {
      if (!active) return;
      seek.notifyFramePresented();
      handle = video.requestVideoFrameCallback!(onFrame);
    };
    handle = video.requestVideoFrameCallback(onFrame);

    return () => {
      active = false;
      if (typeof video.cancelVideoFrameCallback === 'function') {
        video.cancelVideoFrameCallback(handle);
      }
    };
  }, [staticMode, videoSrc, seek]);

  // Progresso do scroll -> destino do vídeo + atualização visual com limiar anti-jank
  const handleProgress = useCallback(
    (progress: number) => {
      seek.request(progress);
      const last = renderedProgressRef.current;
      if (progress === 0 || progress === 1 || Math.abs(progress - last) >= 0.002) {
        renderedProgressRef.current = progress;
        setScrollProgress(progress);
      }
    },
    [seek]
  );

  // GSAP ScrollTrigger vinculado ao track sticky (sem pin:true -> zero mutação DOM, 100% StrictMode-safe)
  useEffect(() => {
    if (staticMode) return;
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => handleProgress(self.progress),
        onRefresh: (self) => handleProgress(self.progress),
      });
    }, track);

    return () => {
      ctx.revert();
    };
  }, [staticMode, scrollDistance, handleProgress]);

  // Handlers de mídia
  const handleLoadedData = () => {
    setReadySrc(videoSrc);
    videoRef.current?.pause();
    seek.reset();
    seek.flush();
  };

  const handleSeeked = () => {
    debug.logSeeked();
    seek.notifySeeked();
  };

  const handleVideoError = () => {
    debug.logError();
    const video = videoRef.current;
    if (video && mediaRetriesRef.current < MAX_MEDIA_RETRIES) {
      mediaRetriesRef.current += 1;
      setReadySrc(null);
      seek.reset();
      video.load();
      return;
    }
    setHasMediaError(true);
    setReadySrc(null);
  };

  // Fallback Estático Elegante (Reduced Motion, Economia de Dados ou Erro Persistente de Mídia)
  if (staticMode) {
    return (
      <section
        id="hero-cinematografico"
        aria-label="Apresentação Óticas Ipanema"
        className="relative w-full min-h-[88vh] bg-navy-dark flex flex-col justify-center overflow-hidden pt-20"
      >
        {isMobile ? (
          <div className="w-full flex flex-col justify-center gap-2 pb-10">
            <div className="relative w-full aspect-video bg-navy-deep overflow-hidden border-y border-azure/25">
              <img
                src={finalPosterSrc}
                alt="Óticas Ipanema — Armação em destaque"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </div>
            <HeroOverlay progress={1} layout="stacked" isStatic />
          </div>
        ) : (
          <>
            <img
              src={finalPosterSrc}
              alt="Óticas Ipanema — Armação em destaque"
              className="absolute inset-0 w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            <HeroOverlay progress={1} layout="overlay" isStatic />
          </>
        )}
      </section>
    );
  }

  return (
    <div
      ref={trackRef}
      id="hero-cinematografico"
      aria-label="Experiência Cinematográfica Óticas Ipanema"
      className="relative w-full"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      {/* Palco Sticky: 100dvh estável sem travar a página */}
      <div className="sticky top-0 w-full h-screen min-h-[100dvh] bg-navy-dark overflow-hidden select-none">
        {isMobile ? (
          /* COMPOSIÇÃO MOBILE PREMIUM (< 768px): Vídeo 16:9 íntegro + Área de Narrativa separada */
          <div className="relative w-full h-full flex flex-col justify-between pt-[72px] pb-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-soft/45 via-navy-deep to-navy-dark">
            {/* Área de Mídia 16:9 sem cortes no rosto, óculos ou mãos */}
            <div className="relative w-full flex-1 flex items-center justify-center px-3 sm:px-6 min-h-0">
              <div className="relative w-full max-w-[540px] aspect-video rounded-sm overflow-hidden border border-azure/30 shadow-elevated-navy bg-navy-deep">
                {/* Poster inicial (evita flash escuro antes do primeiro frame) */}
                <img
                  src={posterSrc}
                  alt="Óticas Ipanema — Modelo usando óculos"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-luxury pointer-events-none ${
                    isVideoReady ? 'opacity-0' : 'opacity-100'
                  }`}
                  fetchPriority="high"
                />

                {/* Vídeo otimizado Mobile (854x480, GOP 6, sem B-frames) */}
                <video
                  key={videoSrc}
                  ref={videoRef}
                  src={videoSrc}
                  playsInline
                  muted
                  preload="auto"
                  onLoadedMetadata={() => seek.flush()}
                  onLoadedData={handleLoadedData}
                  onSeeked={handleSeeked}
                  onError={handleVideoError}
                  {...debug.eventProps}
                  className={`relative z-10 w-full h-full object-cover transition-opacity duration-300 ${
                    isVideoReady ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* Poster final no término do scroll */}
                <img
                  src={finalPosterSrc}
                  alt="Óticas Ipanema — Armação em destaque"
                  className="absolute inset-0 z-15 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
                  style={{ opacity: scrollProgress >= 0.985 ? 1 : 0 }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Área Dedicada de Textos e CTA (0% de sobreposição sobre o vídeo) */}
            <HeroOverlay progress={scrollProgress} layout="stacked" />

            {/* Indicador de Rolagem Inicial em Cápsula Premium (linha dedicada, respeita safe-area e nunca bloqueia toque/scroll) */}
            <div
              className="w-full flex items-center justify-center pt-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: Math.max(0, Math.min(1, 1 - scrollProgress * 6.5)),
              }}
              aria-hidden="true"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-charcoal/85 backdrop-blur-md border border-azure/55 shadow-elevated-dark">
                <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-pure font-medium whitespace-nowrap">
                  ROLE PARA EXPLORAR
                </span>
                <ChevronDown size={15} className="text-azure-light animate-scroll-cue flex-shrink-0" />
              </div>
            </div>
          </div>
        ) : (
          /* COMPOSIÇÃO DESKTOP & TABLET (>= 768px): Cinema Full-Bleed 16:9 com Overlay Localizado */
          <div className="relative w-full h-full flex items-center justify-center bg-navy-dark">
            {/* Poster inicial */}
            <img
              src={posterSrc}
              alt="Óticas Ipanema — Modelo usando óculos"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-luxury pointer-events-none ${
                isVideoReady ? 'opacity-0' : 'opacity-100'
              }`}
              fetchPriority="high"
            />

            {/* Vídeo otimizado Desktop (1280x720, GOP 6, sem B-frames) */}
            <video
              key={videoSrc}
              ref={videoRef}
              src={videoSrc}
              playsInline
              muted
              preload="auto"
              onLoadedMetadata={() => seek.flush()}
              onLoadedData={handleLoadedData}
              onSeeked={handleSeeked}
              onError={handleVideoError}
              {...debug.eventProps}
              className={`relative z-10 w-full h-full object-cover object-center transition-opacity duration-300 ${
                isVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            />

            {/* Poster final no término do scroll */}
            <img
              src={finalPosterSrc}
              alt="Óticas Ipanema — Armação em destaque"
              className="absolute inset-0 z-15 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-300"
              style={{ opacity: scrollProgress >= 0.985 ? 1 : 0 }}
              aria-hidden="true"
            />

            {/* Narrativa Editorial Sincronizada (Canto Inferior Esquerdo) */}
            <HeroOverlay progress={scrollProgress} layout="overlay" />

            {/* Indicador de Rolagem Inicial em Cápsula Premium (centralizado na base, desaparece suavemente ao rolar) */}
            <div
              className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: Math.max(0, Math.min(1, 1 - scrollProgress * 6.5)),
              }}
              aria-hidden="true"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-charcoal/85 backdrop-blur-md border border-azure/55 shadow-elevated-dark">
                <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-pure font-medium whitespace-nowrap">
                  ROLE PARA EXPLORAR
                </span>
                <ChevronDown size={16} className="text-azure-light animate-scroll-cue flex-shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Linha de Progresso Cinemática Sutil (rodapé do palco) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy-soft/70 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-azure/70 via-azure to-azure-light transition-all duration-75 ease-out"
            style={{ width: `${Math.min(100, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
