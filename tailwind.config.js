/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Flex Variable"]
      },
      colors: {
        accent: {
          100: "#0f4e78",
          800: "#1a8cd8",
          900: "#1d9bf0",
        },
        grays: {
          100: "#181818",
          200: "#2f3336",
          300: "#64686d",
          400: "#5d6165",
          800: "#202327",
          900: "#e7e9ea",
          100: "#181818",
        },
        primary: {
          100: "#16181c",
          200: "#1d1f23",
        },
        background: "#000000",
        text: {
          900: "#d2d3d4",
          500: "#575b5f",
          400: "#61666a",
        },
      },
    },
  },
  plugins: [],
};
