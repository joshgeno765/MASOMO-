/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D2340',
          mid: '#1A3A5C',
        },
        brand: {
          blue: '#1E6FA8',
          sky: '#3498DB',
          gold: '#C8932A',
          'gold-light': '#F0B429',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
      }
    }
  },
  plugins: []
}
