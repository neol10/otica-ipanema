import React from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles, Film, ArrowDown } from 'lucide-react';

/**
 * HeroPlaceholder — Placeholder Premium do Hero Cinematográfico (Óticas Ipanema)
 *
 * REGRA RIGOROSA DA ETAPA 1:
 * - Preservar o conceito de scroll e a elegância editorial na nova paleta azul profundo (#123B63)
 *   e azul principal (#3977B5) até aprovação da mídia própria da Óticas Ipanema.
 */
export const HeroPlaceholder: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero-cinematografico"
      aria-label="Apresentação Cinematográfica da Óticas Ipanema"
      className="relative min-h-[90vh] flex flex-col justify-center items-center bg-navy-deep text-pure overflow-hidden py-24 border-b border-azure/30"
    >
      {/* Background decorativo estático e acessível */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-soft via-navy-deep to-navy-dark opacity-95"
        aria-hidden="true"
      />

      {/* Grid sutil de luxo com linhas em azul translúcido */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(57,119,181,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(57,119,181,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 text-center space-y-8">
        {/* Badge de status do design system */}
        <div className="flex justify-center">
          <Badge variant="azure" className="gap-2 bg-azure/20 text-pure border-azure-light/40">
            <Sparkles size={14} className="text-azure-light" />
            <span>Óticas Ipanema &bull; Placeholder Editorial</span>
          </Badge>
        </div>

        {/* Título de exibição com Cormorant Garamond */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-display text-hero-title font-light tracking-tight text-pure text-balance">
            A Arte da Visão em Sua Expressão Mais{' '}
            <span className="italic font-normal text-azure-light underline decoration-azure-light/40 underline-offset-8">
              Sofisticada
            </span>
          </h1>

          <p className="font-sans text-editorial-sub text-mist/85 max-w-2xl mx-auto font-light leading-relaxed">
            Uma experiência visual contemporânea onde moda óptica, curadoria exclusiva e alta estética
            se encontram em Engenheiro Coelho - SP.
          </p>
        </div>

        {/* Card informativo de infraestrutura técnica */}
        <div className="max-w-xl mx-auto glass-dark p-6 rounded-sm border border-azure/35 text-left space-y-3 mt-8">
          <div className="flex items-center gap-2 text-azure-light font-display text-lg font-medium">
            <Film size={18} />
            <span>Placeholder Premium do Hero Cinematográfico</span>
          </div>
          <p className="text-body-sm text-mist/85 leading-relaxed font-light">
            Arquitetura de scroll e VideoSeekController preservados e livres de travamentos,
            aguardando mídia própria da Óticas Ipanema.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-mist/70">
            <span className="bg-obsidian/50 px-2.5 py-1 rounded border border-azure/25">
              Mídia Própria: Aguardando Aprovação
            </span>
            <span className="bg-obsidian/50 px-2.5 py-1 rounded border border-azure/25">
              Reduced-Motion: {prefersReducedMotion ? 'Ativado (Fallback Estático)' : 'Padrão'}
            </span>
          </div>
        </div>

        {/* Indicador de scroll inicial */}
        <div className="pt-10 flex flex-col items-center gap-2 text-azure-light/80 animate-pulse">
          <span className="text-caption uppercase tracking-widest text-[11px]">
            Role para Explorar
          </span>
          <ArrowDown size={16} />
        </div>
      </Container>
    </section>
  );
};
