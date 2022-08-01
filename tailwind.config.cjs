/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'],
        display: ['Rubik', 'sans-serif'],
      },
      boxShadow: {
        level4: '0px 16px 32px rgba(30, 42, 50, 0.08)',
      },
      colors: {
        brand: {
          primary: '#1B31A8',
          secondary: '#0079FF',
        },
        background: '#F4F8FA',
        'neutral-white': '#FFFFFF',
        'blue-gray': {
          10: '#F4F8FA',
          50: '#E9EEF2',
          100: '#CBD5DC',
          300: '#8A9CA9',
          400: '#708797',
          600: '#4D6475',
          800: '#1E2A32',
          900: '#1C1E1F',
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    },
  },
}
