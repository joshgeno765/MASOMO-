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
          // Darker than brand-gold specifically so small gold text passes WCAG AA (4.5:1)
          // on white/light backgrounds. brand-gold itself is ~2.75:1 on white — fine as a
          // button/badge background or on dark navy sections, but fails as light-bg text.
          'gold-dark': '#8A6D1F',
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
