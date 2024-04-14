/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.html",
    "./app/**/*.js"
  ],
  darkMode: "class",
  theme: {
    screens: {
      /* Если проект с подходом Mobile-First, то раскомментировать размеры ниже: */
      /* "xxs": { "min": "320px" },
      "xs": { "min": "375px" },
      "sm": { "min": "425px" },
      "md": { "min": "768px" },
      "lg": { "min": "1024px" },
      "xl": { "min": "1280px" },
      "xxl": { "min": "1536px" }, */
      "xxl": { "max": "1536px" },
      "xl": { "max": "1280px" },
      "lg": { "max": "1024px" },
      "md": { "max": "768px" },
      "sm": { "max": "425px" },
      "xs": { "max": "375px" },
      "xxs": { "max": "320px" },
    },
    container: {
      center: false,
      padding: {
        sm: "15px",
      }
    },
    fontFamily: {
      "sans": ["Inter", "sans-serif"],
    },
    colors: {
      "black": "#000",
      "white": "#fff",
      transparent: "transparent"
    },
    extend: {
      maxWidth: {
        mw: "1566px",
      }
    },
  },
  plugins: [],
}

