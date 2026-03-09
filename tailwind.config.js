/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        warmOrange: '#FF9B71',
        earthBrown: '#8B6F47',
        sageGreen: '#9CAF88',
      },
      fontFamily: {
        handwriting: ['"Klee One"', 'cursive'],
        rounded: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
