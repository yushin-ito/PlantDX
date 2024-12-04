import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#afaffc",
          200: "#9a9af9",
          300: "#9898f9",
          400: "#8687f6",
          500: "#7475f3",
          600: "#5d5fef",
          700: "#4b4de9",
          800: "#3a3bd6",
          900: "#2929c4",
        },
      },
      zIndex: {
        controls: "1000",
      },
    },
  },
  plugins: [],
};

export default config;
