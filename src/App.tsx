import React from 'react';
import { HeaderFoundation } from './components/common/HeaderFoundation';
import { HeroCinematographic } from './components/hero/HeroCinematographic';
import { EssenceSection } from './components/essence/EssenceSection';
import { CollectionsSection } from './components/collections/CollectionsSection';
import { StyleSection } from './components/style/StyleSection';
import { AttendanceSection } from './components/attendance/AttendanceSection';
import { ConversionSection } from './components/conversion/ConversionSection';
import { FooterFoundation } from './components/common/FooterFoundation';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-mist text-obsidian selection:bg-azure/25 selection:text-navy-deep">
      {/* Link para pular direto ao conteúdo principal (Acessibilidade WCAG) */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy-deep focus:text-pure focus:border focus:border-azure"
      >
        Pular para o conteúdo principal
      </a>

      {/* Header com redesign minimalista e flutuante */}
      <HeaderFoundation />

      {/* Conteúdo principal */}
      <main id="conteudo-principal" className="flex-1 block w-full">
        {/* 01. Hero Cinematográfico com controle por Scroll e Placeholder Editorial da Ipanema */}
        <HeroCinematographic />

        {/* 02. Seção A Essência da Marca (#sobre) */}
        <EssenceSection />

        {/* 03. Seção Coleções (#colecoes) */}
        <CollectionsSection />

        {/* 04. Seção Estilo e Personalidade (#estilo) */}
        <StyleSection />

        {/* 05. Seção Atendimento (#atendimento) */}
        <AttendanceSection />

        {/* 06. Seção Final de Conversão (#conversao) */}
        <ConversionSection />
      </main>

      {/* Rodapé definitivo */}
      <FooterFoundation />
    </div>
  );
};
