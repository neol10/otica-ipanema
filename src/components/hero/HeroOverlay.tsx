import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export interface HeroOverlayProps {
  /** Progresso normalizado (0 a 1) emitido pelo ScrollTrigger. */
  progress: number;
  /**
   * 'overlay': Desktop/Tablet (>=768px) — sobreposto no canto inferior esquerdo
   *            com gradiente protetor localizado, preservando rosto, óculos e logo.
   * 'mobile-fullscreen': Mobile (<768px) — sobreposto na base do Hero full-screen (100svh)
   *                      com gradiente escuro sutil inferior, preservando a zona superior
   *                      do rosto/óculos e deixando margem segura para a cápsula de scroll.
   */
  layout?: 'overlay' | 'mobile-fullscreen';
  /** Modo estático (prefers-reduced-motion / economia de dados / erro): exibe ambos os elementos essenciais sem depender de scroll. */
  isStatic?: boolean;
}

/**
 * HeroOverlay — Narrativa Cinematográfica em 3 Atos (Óticas Ipanema)
 *
 * 100% sincronizado ao progresso do ScrollTrigger (nunca por temporizadores) e reversível:
 * - INÍCIO (0.00 → 0.28): "Seu olhar merece uma nova perspectiva." + apoio.
 * - MEIO   (0.28 → 0.70): Textos recolhidos; protagonismo total ao movimento.
 * - FINAL  (0.70 → 1.00): "Encontre o seu estilo." + CTA "EXPLORAR COLEÇÕES" (#colecoes).
 */
export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  progress,
  layout = 'overlay',
  isStatic = false,
}) => {
  // Ato 1 (Início): opacidade 1 em [0, 0.14], fade-out progressivo em [0.14, 0.28]
  const introOpacity = isStatic
    ? 0
    : Math.max(0, Math.min(1, 1 - (progress - 0.14) / 0.14));
  const introTranslateY = (1 - introOpacity) * -18;

  // Ato 3 (Final): fade-in progressivo em [0.70, 0.86], opacidade 1 em [0.86, 1.0]
  const finalOpacity = isStatic
    ? 1
    : Math.max(0, Math.min(1, (progress - 0.70) / 0.16));
  const finalTranslateY = (1 - finalOpacity) * 24;
  const isCtaInteractive = finalOpacity > 0.25;

  // Intensidade do gradiente protetor localizado (quando há texto visível)
  const scrimOpacity = Math.max(introOpacity, finalOpacity);

  // Modo Mobile Full-Screen (< 768px): Overlay na base com gradiente escuro sutil inferior
  if (layout === 'mobile-fullscreen') {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end px-5 sm:px-8 pb-[max(4.75rem,calc(env(safe-area-inset-bottom)+4.25rem))]">
        {/* Gradiente escuro sutil apenas no terço inferior para proteger a leitura sem cobrir o rosto/óculos */}
        <div
          className="absolute inset-x-0 bottom-0 h-[54%] bg-gradient-to-t from-obsidian/95 via-obsidian/65 to-transparent transition-opacity duration-200"
          style={{ opacity: Math.min(1, Math.max(0.35, scrimOpacity * 0.98)) }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-md min-h-[148px] flex items-end">
          {/* Ato 1 — INÍCIO (Mobile Full-Screen) */}
          {!isStatic && (
            <div
              className="absolute inset-x-0 bottom-0 space-y-2 will-change-transform"
              style={{
                opacity: introOpacity,
                transform: `translate3d(0, ${introTranslateY}px, 0)`,
                pointerEvents: introOpacity > 0.2 ? 'auto' : 'none',
              }}
              aria-hidden={introOpacity < 0.05}
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-7 bg-azure-light/85" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-azure-light font-semibold">
                  Óticas Ipanema
                </span>
              </div>

              <h1 className="font-display text-[1.85rem] xs:text-[2.1rem] leading-[1.08] font-light text-pure tracking-tight text-balance drop-shadow-sm">
                Seu olhar merece uma{' '}
                <span className="italic text-azure-light font-normal">nova perspectiva.</span>
              </h1>

              <p className="font-sans text-body-sm text-mist/90 font-light leading-relaxed">
                Estilo e personalidade em cada detalhe.
              </p>
            </div>
          )}

          {/* Ato 3 — FINAL (Mobile Full-Screen) */}
          <div
            className={`${isStatic ? 'relative' : 'absolute inset-x-0 bottom-0'} space-y-3 will-change-transform`}
            style={{
              opacity: finalOpacity,
              transform: `translate3d(0, ${finalTranslateY}px, 0)`,
              pointerEvents: isCtaInteractive ? 'auto' : 'none',
            }}
            aria-hidden={finalOpacity < 0.05}
          >
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-7 bg-azure-light/85" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-azure-light font-semibold">
                Óticas Ipanema
              </span>
            </div>

            {isStatic ? (
              <h1 className="font-display text-[1.95rem] xs:text-[2.2rem] leading-[1.08] font-light text-pure tracking-tight drop-shadow-sm">
                Encontre o <span className="italic text-azure-light font-normal">seu estilo.</span>
              </h1>
            ) : (
              <h2 className="font-display text-[1.95rem] xs:text-[2.2rem] leading-[1.08] font-light text-pure tracking-tight drop-shadow-sm">
                Encontre o <span className="italic text-azure-light font-normal">seu estilo.</span>
              </h2>
            )}

            {isStatic && (
              <p className="font-sans text-body-sm text-mist/90 font-light leading-relaxed">
                Seu olhar merece uma nova perspectiva. Estilo e personalidade em cada detalhe.
              </p>
            )}

            <div className="pt-1">
              <a
                href="#colecoes"
                tabIndex={isCtaInteractive ? 0 : -1}
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-light"
              >
                <Button
                  variant="secondary"
                  size="md"
                  className="group gap-2.5 tracking-wider text-xs uppercase px-6 py-3.5 shadow-elevated-dark"
                >
                  <span>EXPLORAR COLEÇÕES</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modo Desktop / Tablet (>= 768px): Overlay localizado no canto inferior esquerdo
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-8 md:p-14 lg:p-20">
      {/* Gradiente protetor localizado (escurece apenas a base esquerda quando há texto) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-deep/30 to-transparent transition-opacity duration-200"
        style={{ opacity: Math.min(1, scrimOpacity * 0.95) }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-navy-dark/70 via-navy-deep/25 to-transparent transition-opacity duration-200"
        style={{ opacity: Math.min(1, scrimOpacity * 0.85) }}
        aria-hidden="true"
      />

      {/* Palco de Texto com crossfade suave dirigido pelo scroll */}
      <div className="relative z-10 max-w-xl min-h-[210px] md:min-h-[230px] flex items-end">
        {/* Ato 1 — INÍCIO (Desktop/Tablet) */}
        {!isStatic && (
          <div
            className="absolute inset-x-0 bottom-0 space-y-4 will-change-transform"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${introTranslateY}px, 0)`,
              pointerEvents: introOpacity > 0.2 ? 'auto' : 'none',
            }}
            aria-hidden={introOpacity < 0.05}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-9 bg-azure-light/80" />
              <span className="text-caption uppercase tracking-[0.22em] text-azure-light text-xs font-semibold">
                Óticas Ipanema
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-pure leading-[1.06] tracking-tight text-balance">
              Seu olhar merece uma{' '}
              <span className="italic text-azure-light font-normal">nova perspectiva.</span>
            </h1>

            <p className="font-sans text-body-md md:text-body-lg text-mist/90 max-w-md font-light leading-relaxed">
              Estilo e personalidade em cada detalhe.
            </p>
          </div>
        )}

        {/* Ato 3 — FINAL (Desktop/Tablet) */}
        <div
          className={`${isStatic ? 'relative' : 'absolute inset-x-0 bottom-0'} space-y-5 will-change-transform`}
          style={{
            opacity: finalOpacity,
            transform: `translate3d(0, ${finalTranslateY}px, 0)`,
            pointerEvents: isCtaInteractive ? 'auto' : 'none',
          }}
          aria-hidden={finalOpacity < 0.05}
        >
          <div className="flex items-center gap-2.5">
            <span className="h-[1px] w-9 bg-azure-light/80" />
            <span className="text-caption uppercase tracking-[0.22em] text-azure-light text-xs font-semibold">
              Óticas Ipanema
            </span>
          </div>

          {isStatic ? (
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-pure leading-[1.06] tracking-tight">
              Encontre o{' '}
              <span className="italic text-azure-light font-normal">seu estilo.</span>
            </h1>
          ) : (
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-pure leading-[1.06] tracking-tight">
              Encontre o{' '}
              <span className="italic text-azure-light font-normal">seu estilo.</span>
            </h2>
          )}

          {isStatic && (
            <p className="font-sans text-body-md md:text-body-lg text-mist/90 max-w-md font-light leading-relaxed">
              Seu olhar merece uma nova perspectiva. Estilo e personalidade em cada detalhe.
            </p>
          )}

          <div className="pt-1">
            <a
              href="#colecoes"
              tabIndex={isCtaInteractive ? 0 : -1}
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-light"
            >
              <Button
                variant="secondary"
                size="lg"
                className="group gap-3 tracking-wider text-xs uppercase px-7 py-4 shadow-subtle-azure hover:shadow-elevated-navy"
              >
                <span>EXPLORAR COLEÇÕES</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
