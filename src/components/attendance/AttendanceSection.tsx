import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { businessConfig, getWhatsAppLink } from '../../config/business';
import { InstagramIcon } from '../icons/InstagramIcon';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { Sparkles, MapPin, Clock } from 'lucide-react';
import { useCinematic3DReveal } from '../../hooks/useCinematic3DReveal';

export const AttendanceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematic3DReveal(sectionRef);

  const whatsAppLink = getWhatsAppLink();
  const isWhatsAppActive = Boolean(businessConfig.status.isWhatsAppAvailable && whatsAppLink);

  // Link principal do atendimento: WhatsApp oficial das referências
  const primaryActionUrl = isWhatsAppActive ? (whatsAppLink as string) : businessConfig.brand.instagramUrl;
  const primaryActionLabel = 'FALAR COM A IPANEMA';

  return (
    <section
      ref={sectionRef}
      id="atendimento"
      aria-label="Atendimento Óticas Ipanema"
      className="relative py-24 md:py-32 bg-mist-light text-obsidian overflow-hidden border-b border-mist-dark/70"
    >
      <Container size="wide">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{ perspective: '1100px' }}
        >
          {/* Coluna Editorial Principal (7 colunas) — Entrada 3D pela Esquerda */}
          <div data-reveal-3d="left" data-reveal-order="0" className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-10 bg-azure" />
              <span className="text-caption uppercase tracking-[0.25em] text-azure font-semibold text-xs">
                Atendimento Exclusivo
              </span>
            </div>

            {/* Headline em Preto Premium com destaque em Azul */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-obsidian leading-[1.12] tracking-tight">
              Seu estilo merece{' '}
              <span className="italic font-light text-azure underline decoration-azure/30 underline-offset-8">
                atenção aos detalhes.
              </span>
            </h2>

            {/* Texto Institucional */}
            <p className="font-sans text-body-lg text-obsidian-light font-light leading-relaxed max-w-xl text-balance">
              Descubra novas possibilidades para o seu olhar e conheça a Óticas Ipanema. Entre em
              contato pelos nossos canais oficiais e encontre inspiração para sua próxima escolha.
            </p>

            {/* Ações de Contato & Conversão (CTAs em Azul + Contraste Preto/Branco) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              {/* CTA Principal em Azul */}
              <a
                href={primaryActionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-azure text-pure hover:bg-navy-deep font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-subtle-azure group"
              >
                <WhatsAppIcon size={18} className="text-pure transition-colors" />
                <span>{primaryActionLabel}</span>
              </a>

              {/* CTA Secundário em Contraste Preto/Branco com Hover Azul */}
              <a
                href={businessConfig.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-pure border border-obsidian/20 text-obsidian hover:border-azure hover:text-azure font-sans text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300"
              >
                <InstagramIcon size={15} />
                <span>ACOMPANHAR NO INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Coluna Card Editorial / Fotografia Real da Loja Óticas Ipanema (5 colunas) — Entrada 3D pela Direita */}
          <div data-reveal-3d="right" data-reveal-order="1" className="lg:col-span-5">
            <div className="rounded-sm bg-pure border border-obsidian/10 shadow-subtle-obsidian overflow-hidden relative group">
              {/* Fotografia Real Documental do Interior da Loja Óticas Ipanema (12.webp preservada) */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden bg-obsidian border-b border-mist-dark/70">
                <img
                  src="/assets/images/ipanema/ipanema-loja-interior.webp"
                  alt="Interior real da loja Óticas Ipanema em Engenheiro Coelho - SP"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                  loading="lazy"
                  width="382"
                  height="510"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-obsidian/80 via-obsidian/25 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-pure z-10 text-[11px] font-sans">
                  <span className="uppercase tracking-widest text-azure-light text-caption font-medium">
                    Espaço &amp; Atendimento
                  </span>
                  <span className="font-mono text-[10px] text-pure/80">
                    ÓTICAS IPANEMA
                  </span>
                </div>
              </div>

              {/* Conteúdo Institucional do Card */}
              <div className="p-6 sm:p-8 space-y-6 relative">
                <div className="space-y-2 border-b border-mist-dark/70 pb-5">
                  <div className="flex items-center gap-2 text-obsidian">
                    <Sparkles size={16} className="text-azure" />
                    <span className="font-display text-xl font-medium tracking-wide">
                      Experiência Ipanema
                    </span>
                  </div>
                  <p className="font-sans text-body-sm text-obsidian-light font-light leading-relaxed">
                    Atendimento dedicado a harmonizar estética, conforto e bem-estar
                    visual em cada escolha.
                  </p>
                </div>

                {/* Canais Oficiais */}
                <div className="space-y-3">
                  <span className="text-caption uppercase tracking-[0.2em] text-obsidian/70 text-xs font-semibold block">
                    Canais de Atendimento
                  </span>
                  
                  {/* WhatsApp */}
                  {isWhatsAppActive && (
                    <a
                      href={whatsAppLink as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3.5 rounded-sm bg-mist-light/80 border border-mist-dark/80 hover:border-azure/50 transition-colors group/wa"
                    >
                      <div className="w-10 h-10 rounded-full bg-obsidian text-pure flex items-center justify-center flex-shrink-0 group-hover/wa:bg-azure transition-colors">
                        <WhatsAppIcon size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-obsidian block group-hover/wa:text-azure transition-colors">
                          {businessConfig.contact.whatsappFormatted}
                        </span>
                        <span className="text-caption text-slate-dark text-xs block font-light">
                          Atendimento direto via WhatsApp
                        </span>
                      </div>
                    </a>
                  )}

                  {/* Instagram Oficial */}
                  <a
                    href={businessConfig.brand.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-sm bg-mist-light/60 border border-mist-dark/70 hover:border-azure/50 transition-colors group/ig"
                  >
                    <div className="w-10 h-10 rounded-full bg-obsidian text-pure flex items-center justify-center flex-shrink-0 group-hover/ig:bg-azure transition-colors">
                      <InstagramIcon size={20} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-obsidian block group-hover/ig:text-azure transition-colors">
                        {businessConfig.brand.instagramHandle}
                      </span>
                      <span className="text-caption text-slate-dark text-xs block font-light">
                        Atualizações de estilo &amp; novidades
                      </span>
                    </div>
                  </a>
                </div>

                {/* Localização identificada nas referências */}
                {businessConfig.status.isAddressAvailable && businessConfig.location.address && (
                  <div className="space-y-2 pt-2 border-t border-mist-dark/70">
                    <div className="flex items-start gap-2 text-body-sm text-obsidian-light">
                      <MapPin size={16} className="text-azure flex-shrink-0 mt-1" />
                      <span>
                        {businessConfig.location.address}
                        {businessConfig.location.neighborhood && ` - ${businessConfig.location.neighborhood}`}
                        {businessConfig.location.city && `, ${businessConfig.location.city}`}
                        {businessConfig.location.state && ` - ${businessConfig.location.state}`}
                      </span>
                    </div>
                    {businessConfig.location.googleMapsUrl && (
                      <a
                        href={businessConfig.location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-azure hover:underline block pl-6 font-medium"
                      >
                        Ver localização no Google Maps &rarr;
                      </a>
                    )}
                  </div>
                )}

                {businessConfig.status.isScheduleConfirmed && businessConfig.schedule.weekdays && (
                  <div className="flex items-center gap-2 text-body-sm text-obsidian-light pt-2">
                    <Clock size={16} className="text-azure flex-shrink-0" />
                    <span>{businessConfig.schedule.weekdays}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
