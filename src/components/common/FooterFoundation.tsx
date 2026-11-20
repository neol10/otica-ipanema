import React from 'react';
import { Container } from '../ui/Container';
import { businessConfig, getWhatsAppLink } from '../../config/business';
import { InstagramIcon } from '../icons/InstagramIcon';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { MapPin, Clock } from 'lucide-react';

export const FooterFoundation: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsAppLink = getWhatsAppLink();

  return (
    <footer className="w-full bg-obsidian text-pure border-t border-pure/10 pt-16 pb-12 mt-auto">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-pure/10">
          {/* Identidade */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold tracking-wider text-pure">
              {businessConfig.brand.name}
            </h3>
            <p className="text-body-sm text-mist/75 max-w-sm font-light leading-relaxed">
              {businessConfig.brand.tagline}. A sofisticação do design contemporâneo aliada à atenção
              minuciosa ao seu olhar em Engenheiro Coelho - SP.
            </p>
          </div>

          {/* Navegação Interna Completa e Funcional */}
          <div className="space-y-3">
            <h4 className="text-caption uppercase tracking-widest text-azure-light font-medium text-xs">
              Navegação
            </h4>
            <ul className="space-y-2 text-body-sm text-mist/75">
              <li>
                <a href="#sobre" className="hover:text-azure-light transition-colors">
                  A Essência da Marca
                </a>
              </li>
              <li>
                <a href="#colecoes" className="hover:text-azure-light transition-colors">
                  Coleções &amp; Curadoria
                </a>
              </li>
              <li>
                <a href="#estilo" className="hover:text-azure-light transition-colors">
                  Estilo e Personalidade
                </a>
              </li>
              <li>
                <a href="#atendimento" className="hover:text-azure-light transition-colors">
                  Atendimento
                </a>
              </li>
            </ul>
          </div>

          {/* Canais Oficiais e Contato das Referências */}
          <div className="space-y-4">
            <h4 className="text-caption uppercase tracking-widest text-azure-light font-medium text-xs">
              Canais Oficiais
            </h4>
            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              {businessConfig.status.isWhatsAppAvailable && businessConfig.contact.whatsappFormatted && whatsAppLink && (
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-body-sm text-pure/90 hover:text-azure-light transition-colors group"
                  aria-label={`WhatsApp Oficial ${businessConfig.brand.name} ${businessConfig.contact.whatsappFormatted}`}
                >
                  <div className="w-8 h-8 rounded-full bg-charcoal border border-pure/15 flex items-center justify-center text-azure-light group-hover:bg-azure group-hover:border-azure group-hover:text-pure transition-colors">
                    <WhatsAppIcon size={16} />
                  </div>
                  <span>{businessConfig.contact.whatsappFormatted}</span>
                </a>
              )}

              {/* Instagram Oficial */}
              <a
                href={businessConfig.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-body-sm text-pure/90 hover:text-azure-light transition-colors group"
                aria-label={`Instagram Oficial ${businessConfig.brand.name} ${businessConfig.brand.instagramHandle}`}
              >
                <div className="w-8 h-8 rounded-full bg-charcoal border border-pure/15 flex items-center justify-center text-azure-light group-hover:bg-azure group-hover:border-azure group-hover:text-pure transition-colors">
                  <InstagramIcon size={16} />
                </div>
                <span>{businessConfig.brand.instagramHandle}</span>
              </a>
            </div>

            {/* Localização das Referências e Horários Confirmados */}
            {businessConfig.status.isAddressAvailable && businessConfig.location.address && (
              <div className="pt-2 flex items-start gap-2 text-caption text-mist/75">
                <MapPin size={14} className="text-azure-light flex-shrink-0 mt-0.5" />
                <span>
                  {businessConfig.location.address}
                  {businessConfig.location.neighborhood && ` - ${businessConfig.location.neighborhood}`}
                  {businessConfig.location.city && `, ${businessConfig.location.city}`}
                  {businessConfig.location.state && ` - ${businessConfig.location.state}`}
                </span>
              </div>
            )}

            {businessConfig.status.isScheduleConfirmed && businessConfig.schedule.weekdays && (
              <div className="flex items-center gap-2 text-caption text-mist/75">
                <Clock size={14} className="text-azure-light flex-shrink-0" />
                <span>{businessConfig.schedule.weekdays}</span>
              </div>
            )}
          </div>
        </div>

        {/* Linha de Direitos Autorais e Crédito NEWNEO */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-mist/60 text-xs">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {businessConfig.brand.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="tracking-widest uppercase text-[10px] text-mist/45">
              Moda Óptica &bull; Design &bull; Sofisticação
            </p>
            <span className="hidden sm:inline-block h-3 w-[1px] bg-pure/10" aria-hidden="true" />
            <p className="text-[11px] text-mist/70 font-light tracking-wide">
              Desenvolvido por{' '}
              <a
                href="https://www.instagram.com/newneo.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-azure-light hover:text-pure underline decoration-azure/40 hover:decoration-azure-light underline-offset-4 transition-colors duration-300"
              >
                NEWNEO
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
