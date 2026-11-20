import { useEffect, useRef, type RefObject } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { VideoSeekController } from '../utils/videoSeekController';

/**
 * Instrumentação interna de diagnóstico do Hero — SEM renderização visual na UI.
 * Expõe apenas `window.__HERO_DEBUG__.snapshot()` em desenvolvimento (ou com `?heroDebug=1`)
 * para inspeção técnica via console, sem exibir qualquer painel ou HUD sobre o vídeo.
 */
interface EventCounters {
  waiting: number;
  stalled: number;
  suspend: number;
  abort: number;
  seeking: number;
  seeked: number;
  error: number;
}

const EMPTY: EventCounters = {
  waiting: 0,
  stalled: 0,
  suspend: 0,
  abort: 0,
  seeking: 0,
  seeked: 0,
  error: 0,
};

function isDebugEnabled(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window !== 'undefined' && window.location.search.includes('heroDebug=1')) {
    return true;
  }
  return false;
}

export function useHeroDebug(
  videoRef: RefObject<HTMLVideoElement | null>,
  controller: VideoSeekController,
  mode: string = 'video'
) {
  const counters = useRef<EventCounters>({ ...EMPTY });
  const enabled = isDebugEnabled();

  useEffect(() => {
    if (!enabled) return;

    const snapshot = () => {
      const v = videoRef.current;
      const requestedTime = controller.getRequestedTime();
      const currentTime = v ? Number(v.currentTime.toFixed(3)) : null;
      const driftMs =
        requestedTime !== null && currentTime !== null
          ? Math.round(Math.abs(requestedTime - currentTime) * 1000)
          : null;

      return {
        mode,
        scrollY: Math.round(window.scrollY),
        progress: Number(controller.getProgress().toFixed(4)),
        requestedTime: requestedTime !== null ? Number(requestedTime.toFixed(3)) : null,
        currentTime,
        driftMs,
        duration: v && Number.isFinite(v.duration) ? Number(v.duration.toFixed(2)) : null,
        readyState: v?.readyState ?? null,
        networkState: v?.networkState ?? null,
        seeking: v?.seeking ?? null,
        hasRVFC: Boolean(v && 'requestVideoFrameCallback' in v),
        scrollTriggers: ScrollTrigger.getAll().length,
        bodyOverflow: document.body.style.overflow || 'auto',
        seekStats: { ...controller.stats },
        events: { ...counters.current },
      };
    };

    (window as unknown as { __HERO_DEBUG__?: unknown }).__HERO_DEBUG__ = { snapshot };

    return () => {
      delete (window as unknown as { __HERO_DEBUG__?: unknown }).__HERO_DEBUG__;
    };
  }, [videoRef, controller, mode, enabled]);

  const bump = (key: keyof EventCounters) => () => {
    if (!enabled) return;
    counters.current[key] += 1;
  };

  return {
    logError: bump('error'),
    logSeeked: bump('seeked'),
    eventProps: {
      onWaiting: bump('waiting'),
      onStalled: bump('stalled'),
      onSuspend: bump('suspend'),
      onAbort: bump('abort'),
      onSeeking: bump('seeking'),
    },
  };
}
