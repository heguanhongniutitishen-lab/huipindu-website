import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F6FAFF",
          100: "#EAF2FF",
          500: "#165DFF",
          600: "#0D4FE6",
          700: "#0A3FB8"
        },
        skyplus: "#4D7CFF",
        accent: "#FF8A00",
        ink: "#102A43",
        muted: "#667085"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(22, 93, 255, 0.12)",
        card: "0 12px 32px rgba(16, 42, 67, 0.08)"
      },
      borderRadius: {
        card: "8px"
      }
    }
  },
  plugins: []
};

export default config;
