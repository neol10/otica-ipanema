import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { businessConfig, getWhatsAppLink } from '../../config/business';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCinematic3DReveal } from '../../hooks/useCinematic3DReveal';

export const ConversionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematic3DReveal(sectionRef);

  const whatsAppLink = getWhatsAppLink();
  const conversionUrl = whatsAppLink ?? businessConfig.brand.instagramUrl;

  return (
    <section
      ref={sectionRef}
      id="conversao"
      aria-label="Conhecer a Óticas Ipanema"
      className="relative py-24 md:py-32 bg-charcoal text-pure overflow-hidden border-b border-pure/10"
      style={{ perspective: '1100px' }}
    >
      <Container size="default" className="relative z-10 text-center max-w-4xl">
        <div
          data-reveal-3d="left"
          data-reveal-subtle="true"
          data-reveal-order="0"
          className="space-y-9"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pure/15 bg-obsidian/70 text-azure-light text-caption uppercase tracking-[0.25em] text-xs font-medium">
            <Sparkles size={13} />
            <span>{businessConfig.brand.name}</span>
          </div>

          {/* Headline Oficial */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-pure leading-[1.1] tracking-tight text-balance">
            Seu próximo olhar{' '}
            <span className="italic font-normal text-azure-light underline decoration-azure/45 underline-offset-8">
              começa aqui.
            </span>
          </h2>

          {/* Subtítulo Oficial */}
          <p className="font-sans text-body-lg sm:text-xl text-mist/80 font-light leading-relaxed max-w-2xl mx-auto text-balance">
            Estilo, personalidade e novas possibilidades para transformar a maneira como você se apresenta
            ao mundo.
          </p>

          {/* CTA em Azul Assinatura */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={conversionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-sm bg-azure text-pure hover:bg-azure-dark font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-elevated-dark group"
            >
              <WhatsAppIcon size={18} className="text-pure" />
              <span>CONHECER A IPANEMA</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
