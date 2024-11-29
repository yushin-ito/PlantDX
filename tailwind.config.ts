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
          100: "#afaffc",
          200: "#9a9af9",
          300: "#9898f9",
          400: "#8687f6",
          500: "#7475f3",
          600: "#5d5fef",
          700: "#4b4de9",
          800: "#1c1fdb",
          900: "#0000d1",
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
