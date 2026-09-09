import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        // Editorial display serif (runtime-linked, graceful serif fallback)
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Campaign palette — controlled accents against a dark neutral ground.
        ink: {
          900: "#080808",
          800: "#0d0d0d",
          700: "#111111",
          600: "#171717",
        },
        paper: "#f3efe6", // warm off-white
        coral: "#ff5a36", // muted electric orange — Experience
        pink: "#e2879f", // dusty pink — Selected Work
        lavender: "#b3a6ef", // muted lavender — Expertise / Toolkit
        lime: "#c9d661", // soft lime — Contact / accents
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
