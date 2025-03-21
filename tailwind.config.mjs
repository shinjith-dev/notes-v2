/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./wiki/**/*.{html,njk}",
    "./admin/**/*.{html,njk}",
    "./note/**/*.html",
    "./_includes/**/*.{html,njk}",
    "./index.njk",
    "./search.njk"
  ],
  darkMode: "selector",
  theme: {
    fontFamily: {
      serif: ["Rubik", "serif"],
      display: ['"Oleo Script"', "cursive"],
      mono: ['"Inconsolata"', "monospace"],
    },
    extend: {
      colors: {
        primary: "#425f5b",
        brand: "#ee6c4d",
        light: {
          100: "#425f5b",
          200: "#556f6c",
          300: "#69807d",
          400: "#7d918e",
          500: "#92a3a0",
          600: "#a7b5b2",
        },
        dark: {
          100: "#171919",
          200: "#2c2e2e",
          300: "#434444",
          400: "#5b5c5c",
          500: "#747575",
          600: "#8e8f8f",
        },
      },
    },
  },
  plugins: [],
};

