# NEWNEO Web Architect — Estado Persistente do Projeto
**Projeto:** Óticas Ipanema  
**Data:** 19/11/2026  
**Metodologia:** NEWNEO Web Architect v1.0  
**Canal Oficial de Referência:** https://www.instagram.com/oticasipanemaec/

---

## 1. Contexto e Objetivos
* **Objetivo:** Nova landing page independente para a **Óticas Ipanema** (Engenheiro Coelho - SP), utilizando a arquitetura completa, responsiva e acessível do projeto base, com rebranding integral para a nova paleta azul/cinza/branco/preto e blindagem completa do projeto original.
* **Isolamento Garantido:** Diretório independente (`c:\Users\neolu\OneDrive\Desktop\ótica ipanema`), sem vínculo Git com o repositório da Vitaliz (`.git` da Vitaliz removido) e sem qualquer alteração no diretório original `ótica vitaliz`.

---

## 2. Stack Tecnológica Preservada
* **Framework:** React 19 (`^19.0.0`)
* **Linguagem:** TypeScript estrito (`~5.7.2`, target ES2022)
* **Bundler:** Vite (`^6.0.7`) com plugin `@vitejs/plugin-react`
* **Estilização:** Tailwind CSS (`^3.4.17`), PostCSS, Autoprefixer
* **Animações / Scroll:** GSAP (`^3.12.5`) + ScrollTrigger + `VideoSeekController` (com proteção contra fila de seeks, deadlocks e resize loops)
* **Iconografia:** Lucide React (`^1.75.0`) + Componentes SVG dedicados

---

## 3. Design System — Nova Paleta Óticas Ipanema
Substituição semântica avaliada com hierarquia editorial e contraste WCAG AA/AAA:
* **Azul Profundo (`navy`):** `#123B63` (`navy-deep`, `navy-soft: #1A4D7D`, `navy-dark: #0B243D`) — Substitui o antigo Vinho Profundo em superfícies escuras nobres (Hero, Estilo, Conversão, Footer e Header translúcido).
* **Azul Principal (`azure`):** `#3977B5` (`azure`, `azure-light: #649AD1`, `azure-dark: #26588A`) — Substitui o antigo Dourado em acentos, CTAs, bordas luminosas e destaques tipográficos.
* **Branco (`pure`):** `#FFFFFF` (`pure`, `pure-subtle: #F8FAFC`) — Superfícies limpas de alto contraste e tipografia sobre fundo azul profundo.
* **Cinza Claro (`mist`):** `#E7EBEF` (`mist`, `mist-light: #F4F6F8`, `mist-dark: #D3DCE4`) — Substitui o antigo Champagne em fundos editoriais claros (A Essência, Atendimento e cards).
* **Cinza Intermediário (`slate`):** `#8795A3` (`slate`, `slate-light: #A5B1BD`, `slate-dark: #5E6C7A`) — Metadados, legendas e divisores sutis.
* **Preto (`obsidian`):** `#111820` (`obsidian`, `obsidian-light: #2D3845`, `obsidian-dark: #0A0E14`) — Substitui o antigo Grafite na tipografia principal sobre fundos claros.
* **Tipografia:** Display: *Cormorant Garamond* | Interface: *Inter*

---

## 4. Status das Etapas NEWNEO

| Etapa | Descrição | Status |
| :--- | :--- | :--- |
| **Etapa 1** | Duplicação Independente, Rebranding Óticas Ipanema, Classificação de Imagens e Placeholder Hero | `APROVADA` |
| **Etapa 2** | Hero Cinematográfico Premium (Otimização de Vídeo, ScrollTrigger Bidirecional, Mobile Premium e Validação Real) | `APROVADA` |
| **Etapa 3** | Refinamento Visual (Preto Premium `#101216` / Grafite `#1C2229`) e Integração de Imagens Editoriais WebP | `APROVADA` |
| **Etapa 4** | Refinamento Final do Hero (Cápsula "ROLE PARA EXPLORAR", Remoção do HUD de Debug) e Crédito NEWNEO no Footer | `APROVADA` |
| **Experimento 3D** | Cinematic 3D Scroll Reveal expandido de forma leve para todas as seções pós-Hero (`#sobre`, `#colecoes`, `#estilo`, `#atendimento`, `#conversao`) | `APROVADA` |
| **Publicação Git** | Repositório independente inicializado e enviado para `https://github.com/neol10/otica-ipanema.git` (pronto para Vercel) | `CONCLUIDA` |

---

## 5. Dados Comerciais Centralizados (`src/config/business.ts`)
Dados provenientes das referências oficiais, sujeitos à confirmação antes da publicação final:
* **Nome:** Óticas Ipanema
* **Cidade:** Engenheiro Coelho - SP
* **Endereço divulgado:** Rua Sete de Setembro, 424 - Centro
* **WhatsApp exibido:** `5519997617664` (`(19) 99761-7664`)
* **Instagram:** `@oticasipanemaec` (`https://www.instagram.com/oticasipanemaec/`)
* **Não inventados (mantidos `null` / `[]`):** Horários de funcionamento, marcas comercializadas, serviços clínicos, preços atuais, promoções e garantias.

---

## 6. Auditoria e Classificação de Imagens (`imagens ipanema/`)

### Categoria A — Imagens Próprias da Óticas Ipanema (Aproveitáveis)
1. **`12.webp` (382×510, 23.5 KB):** Fotografia real em melhor resolução do interior da loja Óticas Ipanema (letreiro `...ANEMA` na parede escura, bancadas de atendimento e expositores iluminados). Copiada para `public/assets/images/ipanema/ipanema-loja-interior.webp` e aplicada na seção **Atendimento** (`#atendimento`).
2. **`unnamed.webp` (382×510, 20.3 KB):** Fotografia real de óculos solar geométrico degradê exposto na vitrine da loja (com estojo Guess Jeans e caixa Marciano). Copiada para `public/assets/images/ipanema/ipanema-oculos-sol-vitrine.webp` e aplicada no card **Óculos de Sol** da seção **Coleções** (`#colecoes`) e como detalhe óptico no Placeholder do Hero.
3. **`unnamed (1).jpg` (200×200, 10.9 KB):** Miniatura real das prateleiras internas com óculos solares. Copiada para `public/assets/images/ipanema/ipanema-prateleira-oculos.jpg` (reserva técnica; baixa resolução para card amplo).
4. **`unnamed (3).jpg` (101×168, 8.1 KB):** Miniatura real da mesa de atendimento com espelho óptico e letreiro `ÓT...` ao fundo. Copiada para `public/assets/images/ipanema/ipanema-mesa-atendimento.jpg` (reserva técnica; baixa resolução).
5. **`unnamed (5).jpg` (101×168, 6.6 KB):** Miniatura real do espelho oval e gaveteiros da loja. Copiada para `public/assets/images/ipanema/ipanema-espelho-loja.jpg` (reserva técnica; baixa resolução).
6. **`unnamed.jpg` (200×200) e `unnamed (2).jpg` / `unnamed (4).jpg` (101×168 / 200×200):** Duplicatas em baixa resolução de `unnamed.webp` e `12.webp`.

### Categoria B — Imagens Editoriais Genéricas (Na paleta antiga Vinho/Dourado da Vitaliz — Não publicadas sem aprovação)
1. **`Armações de Grau.png` (1199×1312):** Armação de grau cristal sobre superfície champagne com tecido vinho/bordô e bandeja dourada. Embora não tenha logotipo textual explícito, pertence à direção de arte vinho/dourado da Vitaliz. Mantida não publicada; substituída por Placeholder Editorial Azul na seção Coleções até aprovação ou envio de foto própria.
2. **`essencia vitaliz.png` (1199×1312):** Macro de armação de acetato vinho/bordô com fundo dourado. Nomeada com referência à Vitaliz e na paleta vinho; classificada entre B/C e **não publicada**.
3. **`Estilo e Personalidade.png` (1199×1312):** Modelo editorial vestindo blazer vinho/bordô e armação vinho com iluminação dourada. Pertence à identidade cromática da Vitaliz; **não publicada**.
4. **`Estilos & Tendências.png` (1199×1312):** Trio de armações (uma vinho) com veludo vinho em primeiro plano e vaso dourado. Pertence à identidade cromática da Vitaliz; **não publicada**.

### Categoria C — Imagens Estritamente Vinculadas à Nova Ótica Vitaliz (Bloqueadas e Removidas de `public/`)
1. **`Atendimento da Nova Ótica Vitaliz!.png` (1199×1312):** Interior de outra loja com letreiro explícito *"Nova Ótica Vitaliz"* na parede verde. **Estritamente bloqueada.**
2. **`Óculos de Sol.png` (1199×1312):** Óculos de sol acompanhado de estojo bordô com logotipo explícito *"VITALIZ ÓTICA"*. **Estritamente bloqueada.**
3. **Antigos arquivos em `public/assets/images/editorial/vitaliz-*.webp`, `hero-*.webp` e vídeos `hero-scroll-*.mp4`:** Todos removidos de `public/assets/` para garantir que nenhuma imagem ou vídeo da Vitaliz seja publicado na Óticas Ipanema.

---

## 7. Estado do Hero Cinematográfico (Etapa 2 — Implementado e Validado)
* **Arquivo Master Preservado (Intacto):** `hero cinematografico.mp4` (`4.803.072` bytes / 4,58 MB, `1280×720`, `24 fps`, `10.00s` vídeo / `10.03s` container, H.264 High `yuv420p`, apenas 2 keyframes originais nos frames 1 e 161).
* **Derivados Otimizados Criados (Benchmark GOP 6 vs GOP 1 e GOP 12):**
  * `public/assets/video/ipanema-hero-desktop.mp4` — `4.403.023` bytes (4,20 MB), `1280×720`, 24 fps, H.264 Main@L4.0, `yuv420p`, `-g 6 -bf 0` (40 keyframes uniformes a cada 0,25s), sem áudio, `faststart` (`moov@32`).
  * `public/assets/video/ipanema-hero-mobile.mp4` — `2.165.277` bytes (2,06 MB), `854×480`, 24 fps, H.264 Main@L3.1, `yuv420p`, `-g 6 -bf 0` (40 keyframes uniformes a cada 0,25s), sem áudio, `faststart` (`moov@32`).
  * Posters WebP em `public/assets/images/hero/`: inicial desktop (`67,1 KB`), inicial mobile (`36,6 KB`), final desktop (`60,5 KB`), final mobile (`33,8 KB`).
* **Controle Bidirecional e Performance:** GSAP ScrollTrigger em container sticky (`3600px` desktop, `3000px` tablet, `2400px` mobile) + `VideoSeekController` com descarte de destinos intermediários, `epsilon=0.022s`, `retryMs=150ms`, `giveUpMs=2000ms`, `tailGuard=0.045s`, `requestVideoFrameCallback`, fallback para `prefers-reduced-motion`, economia de dados e erro de mídia.
* **Validação Real no Chrome (7 viewports: 320px a 1440px):** `0` erros de console/página, `0` overflow horizontal, `scrollTriggers=1`, latência média de seeking `5.7–7.8 ms`, drift `0–21 ms`.
