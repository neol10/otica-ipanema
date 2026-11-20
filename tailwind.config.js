/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      colors: {
        // Tokens semânticos do projeto Óticas Ipanema
        // Paleta oficial: Azul profundo (#123B63), Azul principal (#3977B5), Branco (#FFFFFF),
        // Cinza claro (#E7EBEF), Cinza intermediário (#8795A3), Preto (#111820)
        navy: {
          deep: '#123B63',
          DEFAULT: '#123B63',
          soft: '#1A4D7D',
          dark: '#0B243D',
        },
        azure: {
          light: '#649AD1',
          DEFAULT: '#3977B5',
          dark: '#26588A',
          glow: 'rgba(57, 119, 181, 0.25)',
        },
        mist: {
          light: '#F4F6F8',
          DEFAULT: '#E7EBEF',
          dark: '#D3DCE4',
        },
        slate: {
          light: '#A5B1BD',
          DEFAULT: '#8795A3',
          dark: '#5E6C7A',
        },
        obsidian: {
          light: '#2D3540',
          DEFAULT: '#101216',
          dark: '#0A0C0F',
        },
        charcoal: {
          soft: '#252D36',
          DEFAULT: '#1C2229',
          border: '#2B333E',
        },
        pure: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Escala tipográfica responsiva e editorial
        'hero-title': ['clamp(2.5rem, 6vw + 1rem, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'section-title': ['clamp(2rem, 3.5vw + 0.5rem, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'editorial-sub': ['clamp(1.125rem, 1.5vw + 0.5rem, 1.75rem)', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'subtle-azure': '0 4px 20px -2px rgba(57, 119, 181, 0.16)',
        'subtle-obsidian': '0 12px 32px -12px rgba(16, 18, 22, 0.14)',
        'elevated-navy': '0 20px 40px -15px rgba(18, 59, 99, 0.42)',
        'elevated-dark': '0 24px 48px -18px rgba(10, 12, 15, 0.55)',
        'glass-rim': '0 0 0 1px rgba(57, 119, 181, 0.22)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
