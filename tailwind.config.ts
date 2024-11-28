import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#c3c3ff",
          200: "#afaffc",
          300: "#9a9af9",
          400: "#9898f9",
          500: "#8687f6",
          600: "#7475f3",
          700: "#5d5fef",
          800: "#4b4de9",
          900: "#1c1fdb",
        },
      },
    },
  },
  plugins: [],
};

export default config;
