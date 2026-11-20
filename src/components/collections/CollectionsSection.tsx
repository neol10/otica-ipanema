import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { Layers, ArrowUpRight } from 'lucide-react';
import { useCinematic3DReveal } from '../../hooks/useCinematic3DReveal';

interface CollectionCategory {
  id: string;
  title: string;
  categoryTag: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
}

const CATEGORIES: CollectionCategory[] = [
  {
    id: 'grau',
    title: 'Armações de Grau',
    categoryTag: 'Linha Oftálmica',
    description:
      'Linhas puras, leveza ergonômica e precisão geométrica para quem valoriza nitidez e sofisticação contínua.',
    imageSrc: '/assets/images/editorial/ipanema-armacoes-grau.webp',
    imageAlt: 'Armações de Grau Óticas Ipanema — Armação metálica e grafite em composição editorial',
    width: 1122,
    height: 1402,
  },
  {
    id: 'solar',
    title: 'Óculos de Sol',
    categoryTag: 'Proteção & Presença',
    description:
      'Lentes com filtro de conforto e armações com personalidade expressiva para iluminar qualquer ocasião.',
    imageSrc: '/assets/images/ipanema/ipanema-oculos-sol-vitrine.webp',
    imageAlt: 'Óculos de Sol Óticas Ipanema — Fotografia real de modelo solar em exposição na loja',
    width: 382,
    height: 510,
  },
  {
    id: 'tendencias',
    title: 'Estilos & Tendências',
    categoryTag: 'Curadoria de Design',
    description:
      'Formas contemporâneas, acetatos selecionados e composições que acompanham a evolução da moda óptica.',
    imageSrc: '/assets/images/editorial/ipanema-estilos-tendencias.webp',
    imageAlt: 'Estilos e Tendências Óticas Ipanema — Trio de armações em acetato tartaruga, azul translúcido e metal fino',
    width: 1122,
    height: 1402,
  },
];

export const CollectionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematic3DReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="colecoes"
      aria-label="Coleções Óticas Ipanema"
      className="py-24 md:py-32 bg-pure text-obsidian overflow-hidden border-b border-mist-dark/70"
    >
      <Container size="wide" className="space-y-14 sm:space-y-18">
        {/* Cabeçalho da Seção */}
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-azure" />
            <span className="text-caption uppercase tracking-[0.25em] text-azure font-semibold text-xs">
              Classificação &bull; Curadoria Óptica
            </span>
          </div>

          {/* Título em Preto Premium com destaque em Azul */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-obsidian tracking-tight">
            Encontre o estilo que{' '}
            <span className="italic font-light text-azure">combina com você.</span>
          </h2>

          {/* Subtítulo em Grafite */}
          <p className="font-sans text-body-lg text-obsidian-light font-light leading-relaxed">
            Explore diferentes possibilidades para valorizar seu olhar.
          </p>
        </div>

        {/* Grid Editorial de Coleções com Fotografia em Destaque e Reveal 3D Alternado (Esquerda -> Direita -> Esquerda) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          style={{ perspective: '1100px' }}
        >
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              data-reveal-3d={idx % 2 === 0 ? 'left' : 'right'}
              data-reveal-order={idx}
              className={`h-full ${idx === 1 ? 'md:mt-4' : ''}`}
            >
              <article className="group relative h-full flex flex-col justify-between bg-pure rounded-sm overflow-hidden border border-mist-dark/80 hover:border-azure/55 transition-all duration-500 shadow-sm hover:shadow-subtle-obsidian">
                {/* Área Fotográfica 4:5 (proporção fiel às fotos editoriais e reais) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-obsidian">
                  <img
                    src={cat.imageSrc}
                    alt={cat.imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                    loading="lazy"
                    width={cat.width}
                    height={cat.height}
                  />

                  {/* Tag de Categoria discreta */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-widest bg-obsidian/80 text-pure backdrop-blur-xs border border-pure/15">
                      {cat.categoryTag}
                    </span>
                  </div>
                </div>

                {/* Informações e Descrição */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between bg-pure">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-medium text-obsidian group-hover:text-azure transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-body-sm text-obsidian-light font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="pt-4 border-t border-mist-dark/70 flex items-center justify-between text-caption text-slate-dark">
                    <span className="uppercase tracking-widest text-[11px] font-medium text-obsidian/75">
                      Curadoria Óticas Ipanema
                    </span>
                    <div className="w-7 h-7 rounded-full border border-obsidian/20 flex items-center justify-center text-obsidian group-hover:border-azure group-hover:bg-azure group-hover:text-pure transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
