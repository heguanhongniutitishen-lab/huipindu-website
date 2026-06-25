import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f1fbf2",
          100: "#daf5dd",
          500: "#31a853",
          600: "#248842",
          700: "#1d6d36"
        },
        sunny: {
          100: "#fff4c2",
          300: "#ffe06a",
          400: "#f6c945",
          500: "#e8ad22"
        },
        ink: "#1d2b23"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(31, 112, 64, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
