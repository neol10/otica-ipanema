import React, { useState, useEffect } from 'react';
import { Container } from '../ui/Container';
import { businessConfig } from '../../config/business';
import { InstagramIcon } from '../icons/InstagramIcon';
import { Menu, X } from 'lucide-react';

export const HeaderFoundation: React.FC = () => {
  const [isLightSection, setIsLightSection] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Monitora o scroll para alternar entre o modo sobre o Hero (azul profundo/translúcido)
  // e o modo sobre seções claras (branco/blur)
  useEffect(() => {
    const handleScroll = () => {
      const colecoesElem = document.getElementById('colecoes');
      if (colecoesElem) {
        const rect = colecoesElem.getBoundingClientRect();
        // Quando a seção clara atinge os primeiros 70px do topo da viewport
        setIsLightSection(rect.top <= 70);
      } else {
        // Fallback baseado em scrollY geral se o elemento não for localizado
        setIsLightSection(window.scrollY > 2500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueia o scroll do body e escuta tecla Escape quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Se o viewport cruzar o breakpoint `lg` (rotação do tablet / resize) com o menu aberto,
  // a gaveta some via CSS (lg:hidden) mas o estado continuava "aberto" e o body ficava com
  // overflow:hidden — página sem rolagem. Fecha o menu (e libera o scroll) ao entrar em `lg`.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-luxury ${
          isLightSection
            ? 'bg-pure/90 backdrop-blur-md border-b border-mist-dark/70 shadow-sm py-3'
            : 'bg-navy-deep/45 backdrop-blur-sm border-b border-azure/25 py-4'
        }`}
      >
        <Container size="wide" className="flex h-10 items-center justify-between">
          {/* Marca / Assinatura Tipográfica Minimalista (sem quebras de linha em viewports estreitos) */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-azure"
            aria-label="Óticas Ipanema — Início"
          >
            <span
              className={`font-display text-base sm:text-xl font-medium tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${
                isLightSection
                  ? 'text-navy-deep group-hover:text-azure'
                  : 'text-pure group-hover:text-azure-light'
              }`}
            >
              {businessConfig.brand.name}
            </span>
          </a>

          {/* Navegação Desktop Simplificada & Editorial */}
          <nav aria-label="Navegação Principal" className="hidden lg:flex items-center gap-8">
            <a
              href="#colecoes"
              className={`text-caption uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 hover:text-azure ${
                isLightSection ? 'text-obsidian' : 'text-pure/90'
              }`}
            >
              Coleções
            </a>

            <a
              href="#atendimento"
              className={`text-caption uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 hover:text-azure ${
                isLightSection ? 'text-obsidian' : 'text-pure/90'
              }`}
            >
              Atendimento
            </a>

            <div className={`h-3 w-[1px] ${isLightSection ? 'bg-obsidian/20' : 'bg-pure/25'}`} />

            {/* Canal Oficial Instagram */}
            <a
              href={businessConfig.brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Oficial Óticas Ipanema"
              className={`p-1.5 transition-colors duration-300 hover:text-azure-light ${
                isLightSection ? 'text-navy-deep' : 'text-azure-light'
              }`}
            >
              <InstagramIcon size={18} />
            </a>

            {/* Botão Cápsula Discreto */}
            <a
              href="#colecoes"
              className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                isLightSection
                  ? 'border border-navy-deep/35 text-navy-deep hover:bg-navy-deep hover:text-pure'
                  : 'border border-azure-light/55 text-pure bg-navy-deep/50 hover:bg-azure hover:text-pure hover:border-azure'
              }`}
            >
              Explorar
            </a>
          </nav>

          {/* Ações Mobile & Tablet: Instagram + Toggle do Menu Compacto */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={businessConfig.brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Oficial Óticas Ipanema"
              className={`p-2 transition-colors ${
                isLightSection ? 'text-navy-deep hover:text-azure' : 'text-azure-light hover:text-pure'
              }`}
            >
              <InstagramIcon size={19} />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-azure transition-colors ${
                isLightSection ? 'text-navy-deep' : 'text-pure'
              }`}
              aria-label={isMobileMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Menu Gaveta Mobile/Tablet Compacto e Acessível */}
      <div
        className={`fixed inset-0 z-40 bg-navy-deep/95 backdrop-blur-xl transition-all duration-400 ease-luxury lg:hidden flex flex-col justify-center px-8 sm:px-12 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="space-y-6 text-center">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-azure-light block">
            {businessConfig.brand.name}
          </span>

          <nav className="flex flex-col gap-5">
            <a
              href="#sobre"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl font-light text-pure hover:text-azure-light transition-colors tracking-wide"
            >
              A Essência
            </a>

            <a
              href="#colecoes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl font-light text-pure hover:text-azure-light transition-colors tracking-wide"
            >
              Coleções
            </a>

            <a
              href="#estilo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl font-light text-pure hover:text-azure-light transition-colors tracking-wide"
            >
              Estilo &amp; Personalidade
            </a>

            <a
              href="#atendimento"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl font-light text-azure-light hover:text-pure transition-colors tracking-wide"
            >
              Atendimento
            </a>

            <div className="pt-2">
              <a
                href={businessConfig.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-xs uppercase tracking-[0.2em] text-mist/85 hover:text-azure-light transition-colors inline-flex items-center justify-center gap-2"
              >
                <InstagramIcon size={16} />
                <span>{businessConfig.brand.instagramHandle}</span>
              </a>
            </div>
          </nav>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-2 rounded-full border border-azure-light/45 text-azure-light text-xs uppercase tracking-widest font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
