import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#0a66c2",
        "background-light": "#f5f7f8",
        "background-dark": "#101922",
        "surface-light": "#ffffff",
        "surface-dark": "#1a242d",
        "text-light": "#101922",
        "text-dark": "#f5f7f8",
        "subtext-light": "#6b7280",
        "subtext-dark": "#9ca3af",
        "border-light": "#e5e7eb",
        "border-dark": "#374151",
        "success": "#22c55e",
        "warning": "#f59e0b",
        "danger": "#ef4444",
        "info": "#3b82f6",
      },
      fontFamily: {
        "display": ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: { 
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "full": "9999px" 
      },
    },
  },
  plugins: [],
} satisfies Config;