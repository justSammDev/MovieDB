/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        text: "#def0f1",
        background: "#081313",
        primary: "#a2d2d7",
        secondary: "#302f6f",
        accent: "#8761bc",
      },
    },
  },
  plugins: [],
};
