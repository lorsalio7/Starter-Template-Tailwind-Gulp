/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.html",
    "./app/**/*.js"
  ],
  darkMode: "class",
  theme: {
    screens: {
      "xxl": { "max": "1536px" },
      "xl": { "max": "1280px" },
      "lg": { "max": "1024px" },
      "md": { "max": "768px" },
      "sm": { "max": "640px" },
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
      "black": "rgb(0, 0, 0)",
      "white": "rgb(255, 255, 255)",
      "blue": "rgb(0, 0, 255)",
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

