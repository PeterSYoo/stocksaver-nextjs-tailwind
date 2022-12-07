/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        light: '#F3F3F3',
        dark: '#1e2124',
      },
      boxShadow: {
        darkmd: '1px 1px 0px 0px rgba(87, 86, 83)',
        dark3xl: '3px 3px 0px 0px rgba(87, 86, 83)',
        darkHeader: '0px 3px 0px 0px rgba(87, 86, 83)',
      },
      fontFamily: {
        sans: ['var(--font-openSans)'],
        serif: ['var(--font-playfair)'],
      },
    },
    screens: {
      md: '925px',
    },
  },
  plugins: [],
};
