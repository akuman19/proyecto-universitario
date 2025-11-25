/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891b2',
          dark: '#0e7490',
          light: '#22d3ee',
        },
        secondary: '#f97316',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
