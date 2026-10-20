/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Exact colors sampled from the BLC logo (public/logo.png)
        brand: {
          50: '#E7F2EC',
          100: '#C7E3D3',
          200: '#96CBAC',
          300: '#5FAE83',
          400: '#2F8F5E',
          500: '#0F7245',
          600: '#00602F',
          700: '#005029', // exact logo green
          800: '#00381D',
          900: '#002313',
          950: '#001710',
        },
        gold: {
          300: '#FFF9B0',
          400: '#FFF566',
          500: '#FEF200', // exact logo yellow
          600: '#D4C900',
          700: '#A89F00', // accessible on light backgrounds
        },
        paper: {
          DEFAULT: '#F8F6EF',
          dim: '#EFEADA',
        },
      },
      fontFamily: {
        // Noto fallbacks supply the Hindi (Devanagari) and Punjabi (Gurmukhi) glyphs Poppins lacks;
        // browsers only download them when those scripts actually appear on the page
        sans: ['Poppins', '"Noto Sans Devanagari"', '"Noto Sans Gurmukhi"', 'system-ui', 'sans-serif'],
        display: ['Poppins', '"Noto Sans Devanagari"', '"Noto Sans Gurmukhi"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Noto Serif Devanagari"', '"Noto Serif Gurmukhi"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 10, 10, 0.06)',
        'card-hover': '0 14px 28px rgba(10, 10, 10, 0.14)',
      },
      borderRadius: {
        xl2: '1.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
