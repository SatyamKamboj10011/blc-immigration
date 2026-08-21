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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 35, 19, 0.06)',
        'card-hover': '0 10px 24px rgba(0, 35, 19, 0.12)',
      },
      borderRadius: {
        xl2: '0.375rem',
      },
    },
  },
  plugins: [],
};
