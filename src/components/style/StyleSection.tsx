import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { Compass, Sparkles } from 'lucide-react';
import { useCinematic3DReveal } from '../../hooks/useCinematic3DReveal';

const STYLE_PILLARS = [
  {
    name: 'Clássico & Atemporal',
    description: 'Proporções equilibradas e linhas elegantes que atravessam tendências com discrição e nobreza.',
  },
  {
    name: 'Moderno & Autoral',
    description: 'Geometrias marcantes, acetatos translúcidos e cortes contemporâneos que afirmam presença.',
  },
  {
    name: 'Minimalista & Preciso',
    description: 'Perfis ultrafinos em titânio e metais nobres, onde a leveza e a função pura são protagonistas.',
  },
];

export const StyleSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematic3DReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="estilo"
      aria-label="Estilo e Personalidade — Óticas Ipanema"
      className="relative py-24 md:py-32 bg-obsidian text-pure overflow-hidden border-b border-pure/10"
    >
      <Container size="wide" className="relative z-10 space-y-16 sm:space-y-20">
        {/* Bloco Superior: Headline de Alto Impacto em Branco + Azul */}
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-azure-light" />
            <span className="text-caption uppercase tracking-[0.25em] text-azure-light font-semibold text-xs">
              Estilo e Personalidade
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-pure leading-[1.08] tracking-tight">
            Um estilo para{' '}
            <span className="italic font-normal text-azure-light underline decoration-azure/45 underline-offset-8">
              cada olhar.
            </span>
          </h2>

          <p className="font-sans text-body-lg text-mist/80 font-light leading-relaxed max-w-2xl text-balance">
            Clássico, moderno, discreto ou marcante. Os óculos são uma forma de expressar sua
            personalidade em cada detalhe.
          </p>
        </div>

        {/* Composição Editorial Central: Retrato Aprovado (7 Colunas) + Pilares em Grafite (5 Colunas) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{ perspective: '1100px' }}
        >
          {/* Fotografia Editorial Aprovada — Entrada 3D pela Esquerda */}
          <div data-reveal-3d="left" data-reveal-order="0" className="lg:col-span-7">
            <div className="relative group w-full max-w-[540px] mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-pure/12 shadow-elevated-dark bg-charcoal">
                <img
                  src="/assets/images/editorial/ipanema-estilo-personalidade.webp"
                  alt="Estilo e Personalidade — Retrato editorial Óticas Ipanema"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                  loading="lazy"
                  width="1122"
                  height="1402"
                />

                {/* Gradiente protetor inferior localizado */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-pure z-10">
                  <div className="flex items-center gap-2 text-caption">
                    <Sparkles size={14} className="text-azure-light" />
                    <span className="tracking-widest uppercase text-xs font-medium">
                      Harmonia &bull; Forma &bull; Expressão
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-mist/75 tracking-wider">
                    ÓTICAS IPANEMA
                  </span>
                </div>
              </div>

              {/* Moldura arquitetural sutil */}
              <div
                className="absolute -top-3 -right-3 w-full h-full border border-pure/10 rounded-sm -z-10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Pilares de Expressão em Grafite (#1C2229) com Bordas Sutis (5 Colunas) — Entrada 3D pela Direita */}
          <div data-reveal-3d="right" data-reveal-order="1" className="lg:col-span-5 space-y-5">
            {STYLE_PILLARS.map((pillar, index) => (
              <div
                key={pillar.name}
                className="p-6 rounded-sm bg-charcoal border border-pure/10 hover:border-azure/50 transition-all duration-300 space-y-2 hover:bg-charcoal-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-azure-light font-semibold">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-xl font-medium text-pure">
                    {pillar.name}
                  </h3>
                </div>
                <p className="font-sans text-body-sm text-mist/75 font-light leading-relaxed pl-7">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
