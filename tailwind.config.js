/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iransans: ["IranSans", "sans-serif"],
        iransansfa: ["IranSansfa", "sans-serif"],
        
      },
    },
  },
  plugins: [],
}

