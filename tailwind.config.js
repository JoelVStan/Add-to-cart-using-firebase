/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"]
      },
      colors: {
        'gray-bg': '#EEF0F4',
        'gray-input': '#DCE1EB',
        'button-color': '#1a1a1d',
        'list-bg': '#FFFDF8'
      }
    },
  },
  plugins: [],
}

