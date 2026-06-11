import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#e9c349",
        "on-primary": "#ffffff",
        "primary-container": "#2c2c2c",
        "on-tertiary-container": "#4f3d00",
        "on-surface": "#1c1b1b",
        "surface-container-low": "#f7f3f2",
        "outline-variant": "#c4c7c7",
        "on-background": "#1c1b1b",
        "tertiary-fixed": "#ffe088",
        "on-tertiary-fixed": "#241a00",
        "on-primary-fixed-variant": "#474747",
        "primary-fixed-dim": "#c8c6c5",
        secondary: "#9a4247",
        "inverse-on-surface": "#f4f0ef",
        "on-surface-variant": "#444748",
        "inverse-primary": "#c8c6c5",
        "on-secondary-fixed-variant": "#7c2b31",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-lowest": "#ffffff",
        primary: "#171818",
        "surface-variant": "#e5e2e1",
        "surface-container-high": "#ebe7e7",
        "on-secondary-container": "#77282e",
        "inverse-surface": "#313030",
        background: "#fdf8f8",
        "primary-fixed": "#e4e2e1",
        "on-tertiary-fixed-variant": "#574500",
        "on-secondary": "#ffffff",
        "surface-bright": "#fdf8f8",
        "on-error-container": "#93000a",
        "secondary-container": "#fe9295",
        outline: "#747878",
        "surface-dim": "#ddd9d8",
        surface: "#fdf8f8",
        "tertiary-container": "#cca730",
        "on-secondary-fixed": "#40000a",
        "secondary-fixed-dim": "#ffb3b4",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#949393",
        "surface-container": "#f1edec",
        "secondary-fixed": "#ffdad9",
        tertiary: "#735c00",
        "surface-container-highest": "#e5e2e1",
        "surface-tint": "#5f5e5e",
        error: "#ba1a1a",
        "on-primary-fixed": "#1b1c1c",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "margin-edge": "40px",
        gutter: "24px",
        "container-max": "1120px",
        unit: "8px",
        "section-gap": "120px",
      },
      maxWidth: {
        "container-max": "1120px",
      },
      fontFamily: {
        "display-lg-mobile": ["var(--font-eb-garamond)", "serif"],
        "headline-lg": ["var(--font-eb-garamond)", "serif"],
        "display-lg": ["var(--font-eb-garamond)", "serif"],
        "body-lg": ["var(--font-montserrat)", "sans-serif"],
        "body-md": ["var(--font-montserrat)", "sans-serif"],
        "headline-md": ["var(--font-eb-garamond)", "serif"],
        "label-caps": ["var(--font-montserrat)", "sans-serif"],
      },
      fontSize: {
        "display-lg-mobile": ["40px", { lineHeight: "1.1", fontWeight: "400" }],
        "headline-lg": ["48px", { lineHeight: "1.2", fontWeight: "400" }],
        "display-lg": [
          "64px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "body-lg": [
          "16px",
          { lineHeight: "1.8", letterSpacing: "0.08em", fontWeight: "300" },
        ],
        "body-md": [
          "14px",
          { lineHeight: "1.6", letterSpacing: "0.05em", fontWeight: "300" },
        ],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "label-caps": [
          "12px",
          { lineHeight: "1", letterSpacing: "0.2em", fontWeight: "500" },
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 1s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [forms, containerQueries],
};

export default config;
