import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|rose|orange|green|blue|yellow|violet)-600/,
      variants: ["hover"],
    },
    {
      pattern: /text-(red|rose|orange|green|blue|yellow|violet)-600/,
    },
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.675rem",
      },
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
          900: "#151d48",
        },
      },
      zIndex: {
        toolbar: "10",
        controls: "10",
        fab: "10",
      },
      keyframes: {
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
