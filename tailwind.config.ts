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
        // Brand colors from design tokens
        brand: {
          yellow: "#FFD700",
          yellowAcc: "#FFC107", 
          red: "#DC143C",
          white: "#FFFFFF",
          silver: "#C0C0C0"
        },
        // Base colors from design tokens
        base: {
          black: "#000000",
          bg: "#0B0D0F",
          surface: "#111317",
          surfaceAlt: "#161A20",
          card: "#14181F",
          border: "#2A2F39",
          divider: "rgba(255,255,255,0.06)"
        },
        // Text colors from design tokens
        text: {
          primary: "#FFFFFF",
          secondary: "#C7CDD4", 
          muted: "#9AA3AF",
          inverse: "#0B0D0F"
        },
        // State colors from design tokens
        states: {
          success: "#22C55E",
          warning: "#EAB308",
          inactive: "#6B7280"
        },
        // Legacy colors for backward compatibility
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
        "display": ["Inter", "ui-sans-serif", "system-ui"],
        "ui": ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: { 
        "xs": "6px",
        "sm": "8px", 
        "md": "12px",
        "lg": "16px", 
        "xl": "20px", 
        "full": "9999px" 
      },
      boxShadow: {
        "sm": "0 1px 2px rgba(0,0,0,0.40)",
        "md": "0 6px 16px rgba(0,0,0,0.50)",
        "lg": "0 10px 30px rgba(0,0,0,0.55)"
      },
    },
  },
  plugins: [],
} satisfies Config;