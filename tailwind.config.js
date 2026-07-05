/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E",
        secondary: "#16A34A",
        light: "#F8FAFC",
        dark: "#111827",
        graybg: "#F5F5F7"
      },

      borderRadius: {
        xl2: "24px"
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },

      boxShadow: {
        apple: "0 10px 35px rgba(0,0,0,.08)"
      }
    },
  },
  plugins: [],
}