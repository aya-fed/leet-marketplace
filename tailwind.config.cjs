/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Just-in-Time mode to make the build time much faster
  darkMode: "media", // or remove this line if darkMode is not used
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    screens: {
      xs: { min: "420px" },
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#51D9D9",
        },
        secondary: {
          DEFAULT: "#9747FF",
          dark: "#5A328F",
        },
        background: {
          4: "#424867",
          3: "#252A41",
          2: "#1E2235",
          1: "#1A1D2D",
        },
        neutral: {
          light: "#dcdef3",
          DEFAULT: "#ABADC6",
          dark: "#7d7e89",
        },
        warning: {
          DEFAULT: "#EA4335",
        },
        yellow: {
          DEFAULT: "#FBBC05",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};
