import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation:{
        'fade-in':' fadeIn 0.3s ease-in-out',
      },
      keyframes:{
        fadeIn: {
          "0%": { opacity: "0" }, 
          "100%": { opacity: "0.3" }, 
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
