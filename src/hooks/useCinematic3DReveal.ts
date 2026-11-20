import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useCinematic3DReveal — Experimento Cinematic 3D Scroll Reveal (Óticas Ipanema)
 *
 * Aplica entradas tridimensionais alternadas (esquerda / direita) sincronizadas
 * ao scroll via GSAP ScrollTrigger com `scrub` calibrado (100% reversível ao subir,
 * sem delays fixos e sem criar pin spacers).
 *
 * - Desktop (>= 768px): translateX ±90px, translateY 80px, rotateY ±18deg, scale 0.88 -> 1, blur 6px -> 0px.
 * - Mobile  (<  768px): translateX ±25px, translateY 40px, rotateY ±7deg,  scale 0.96 -> 1, sem blur pesado.
 * - Respeita `prefers-reduced-motion: reduce` via `gsap.matchMedia()`.
 * - Cleanup automático e seguro para React StrictMode (`mm.revert()`).
 */
export function useCinematic3DReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal-3d]')
    );
    if (targets.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px) — Profundidade 3D cinematográfica leve e fluida
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      targets.forEach((el) => {
        const direction = el.getAttribute('data-reveal-3d') === 'right' ? 'right' : 'left';
        const isSubtle = el.getAttribute('data-reveal-subtle') === 'true';
        const order = Number(el.getAttribute('data-reveal-order') ?? 0);
        const startOffset = isSubtle ? 94 : Math.max(70, 94 - order * 10);
        const endOffset = isSubtle ? 62 : Math.max(26, 46 - order * 8);

        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: direction === 'left' ? (isSubtle ? -36 : -90) : (isSubtle ? 36 : 90),
            y: isSubtle ? 48 : 80,
            rotateY: direction === 'left' ? (isSubtle ? 8 : 18) : (isSubtle ? -8 : -18),
            scale: isSubtle ? 0.94 : 0.88,
            ...(isSubtle ? {} : { filter: 'blur(4px)' }),
            transformPerspective: 1100,
            transformOrigin: direction === 'left' ? 'left center' : 'right center',
            willChange: 'transform, opacity',
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            ...(isSubtle ? {} : { filter: 'blur(0px)' }),
            ease: 'power2.out',
            force3D: true,
            clearProps: isSubtle ? 'willChange' : 'filter,willChange',
            scrollTrigger: {
              trigger: el,
              start: `top ${startOffset}%`,
              end: `top ${endOffset}%`,
              scrub: isSubtle ? 0.65 : 0.85,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    // Mobile (< 768px) — Intensidade reduzida, apenas transform + opacity (zero blur pesado)
    mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
      targets.forEach((el) => {
        const direction = el.getAttribute('data-reveal-3d') === 'right' ? 'right' : 'left';
        const isSubtle = el.getAttribute('data-reveal-subtle') === 'true';

        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: direction === 'left' ? (isSubtle ? -18 : -25) : (isSubtle ? 18 : 25),
            y: isSubtle ? 30 : 40,
            rotateY: direction === 'left' ? (isSubtle ? 5 : 7) : (isSubtle ? -5 : -7),
            scale: 0.96,
            transformPerspective: 1000,
            transformOrigin: direction === 'left' ? 'left center' : 'right center',
            willChange: 'transform, opacity',
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            ease: 'power2.out',
            force3D: true,
            clearProps: 'willChange',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: isSubtle ? 'top 66%' : 'top 52%',
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, [containerRef]);
}
