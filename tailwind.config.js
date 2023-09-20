const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./dist/*.{html,js}"
  ],
  theme: {
    extend: {},
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      "2xl": "1400px"  
    },
    fontFamily: {
      familyNormal: ['JostMeduim'],
      familyBold: ['JostBold'],
      familyExtraBold: ['JostExtraBold', 'sans-serif'],
    },
    colors: {
      primary: colors.cyan[800],
      secondary: '#F0F4F8'
    },
    backgroundImage: {
      bgPattern: "url('/img/bg-pattern.svg')",
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
})
