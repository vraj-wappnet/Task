/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Upright"', "serif"],
      },
      colors: {
        Green: "#16a34a",
        primary: "#FF0000",
        secondary: "#1D4ED8",
        txt: "#FACC15",
        gray: "#ccc",
        background: "#000",
        white: "#FFFFFF",
      },
      fontFamily: {
        cormorant: ["Cormorant Upright", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
