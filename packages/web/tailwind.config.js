/** @typedef { import("tailwindcss/defaultConfig") } DefaultConfig */
/** @typedef { import("tailwindcss/defaultTheme") DefaultTheme } */

const { colors: defaultColors, colors } = require("tailwindcss/defaultTheme")

/** @type { DefaultConfig & { theme: { extend: DefaultTheme } } } */
module.exports = {
  mode: "jit",
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffffff",
          100: "#e4e2f4",
          200: "#cac6e8",
          300: "#afa9dd",
          400: "#958cd2",
          500: "#7a6fc7",
          600: "#6053bb",
          700: "#4d41a5",
          800: "#403688",
          900: "#322a6c",
        },
        secondary: {
          50: "#c7dd92",
          100: "#c1da87",
          200: "#bcd67c",
          300: "#b6d371",
          400: "#b0d066",
          500: "#abcc5b",
          600: "#a5c950",
          700: "#9fc545",
          800: "#99c13c",
          900: "#91b638",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
