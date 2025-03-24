import colors from './src/constants/palette.js'
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        iransans: ["IranSans", "sans-serif"],
      },
    },

  },
  plugins: [],
}

