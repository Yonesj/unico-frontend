import colors from './src/constants/palette.js'
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'custom': 'min(70vh, 900px)',
      },
      colors,
      fontFamily: {
        iransans: ["IranSans", "sans-serif"],
        iransansfa: ["IranSansfa", "sans-serif"],
        
      },
    },

  },
  plugins: [],
}

