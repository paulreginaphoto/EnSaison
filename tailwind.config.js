/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf7ee",
        linen: "#f3eadc",
        ink: "#2f332d",
        sage: {
          50: "#edf3ea",
          100: "#dce9d7",
          500: "#7f9b77",
          700: "#526b4f",
        },
        amberSeason: "#c8933c",
        terracotta: "#c46f5f",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(73, 59, 42, 0.10)",
        row: "0 8px 24px rgba(73, 59, 42, 0.08)",
      },
      fontFamily: {
        sans: [
          "Fredoka",
          "Avenir Next",
          "Nunito Sans",
          "Segoe UI Rounded",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
