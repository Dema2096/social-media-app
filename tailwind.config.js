/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#0A192F",
        "secondary":"#F97316",
        "tertiary":"#54D6BB"
      }
    },
    screens: {
      'xx': {"max": "1080px"},
      'md': {'max': '900px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '425px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}

