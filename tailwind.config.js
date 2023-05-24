/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'nav-lite': { 'max': '1080px' },
      'nav': { 'min': '1081px' },
      "mobile": { 'max': "426px" }
    },
    extend: {
      colors: {
        main: "#4a8fe8",
        transparent: "transparent",
        secondary: "#475A73",
      },
    },
  },
  plugins: [],
}

