import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { Sparkles, Eye } from 'lucide-react';
import { useCinematic3DReveal } from '../../hooks/useCinematic3DReveal';

export const EssenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematic3DReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-label="A Essência da Marca — Óticas Ipanema"
      className="relative py-24 md:py-32 bg-mist-light text-obsidian overflow-hidden border-b border-mist-dark/70"
    >
      <Container size="wide">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{ perspective: '1100px' }}
        >
          {/* Coluna Editorial / Texto (Assimétrica - 7 colunas) — Entrada 3D pela Esquerda */}
          <div
            data-reveal-3d="left"
            data-reveal-order="0"
            className="lg:col-span-7 space-y-8 order-2 lg:order-1"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-10 bg-azure" />
              <span className="text-caption uppercase tracking-[0.25em] text-azure font-semibold text-xs">
                A Essência da Marca
              </span>
            </div>

            {/* Headline Obrigatória em Preto Premium com destaque em Azul */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-obsidian leading-[1.1] tracking-tight">
              Seu olhar revela{' '}
              <span className="italic font-light text-azure underline decoration-azure/30 underline-offset-8">
                quem você é.
              </span>
            </h2>

            {/* Texto Oficial */}
            <p className="font-sans text-body-lg text-obsidian-light font-light leading-relaxed max-w-xl text-balance">
              Mais do que um acessório, os óculos fazem parte da sua identidade. Cada detalhe pode
              transformar a maneira como você se expressa e revela seu estilo.
            </p>

            {/* Destaque conceitual */}
            <div className="pt-4 border-l-2 border-azure/50 pl-6 space-y-2">
              <div className="flex items-center gap-2 text-obsidian font-display text-xl font-medium">
                <Sparkles size={16} className="text-azure" />
                <span>Elegância &bull; Conforto &bull; Singularidade</span>
              </div>
              <p className="font-sans text-body-sm text-obsidian-light/85 font-light max-w-lg">
                Curadoria atenta à proporção do rosto, ao peso das hastes e à pureza das linhas,
                para que a sua expressão seja autêntica e inconfundível.
              </p>
            </div>
          </div>

          {/* Coluna Visual / Fotografia Macro Editorial Aprovada como Protagonista (5 colunas) — Entrada 3D pela Direita */}
          <div
            data-reveal-3d="right"
            data-reveal-order="1"
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-obsidian border border-obsidian/10 shadow-subtle-obsidian transition-all duration-700 group-hover:shadow-elevated-dark">
                <img
                  src="/assets/images/editorial/ipanema-essencia.webp"
                  alt="A Essência Óticas Ipanema — Fotografia macro editorial de armação azul translúcida com detalhe metálico"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                  loading="lazy"
                  width="1122"
                  height="1402"
                />

                {/* Vinheta inferior discreta apenas para legibilidade do selo */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/80 via-obsidian/25 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Selo discreto de identificação editorial */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between text-pure text-caption">
                  <div className="flex items-center gap-2">
                    <Eye size={14} className="text-azure-light" />
                    <span className="tracking-widest uppercase text-[11px] font-medium">
                      Design &bull; Alta Estética
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-mist/80 tracking-wider uppercase">
                    Óticas Ipanema
                  </span>
                </div>
              </div>

              {/* Moldura arquitetural sutil atrás da imagem */}
              <div
                className="absolute -bottom-3 -left-3 w-full h-full border border-obsidian/12 rounded-sm -z-10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
