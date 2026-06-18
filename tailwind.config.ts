import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Comforting sage-green palette — primary brand
        // (key kept as `blue` so existing `blue-*` classes recolor cohesively)
        blue: {
          50:  "#F1F8F4",
          100: "#DCF0E4",
          200: "#BBE1CB",
          300: "#90CDA9",
          400: "#5DB286",
          500: "#3D9568",
          600: "#2F7B54",
          700: "#286244",
          800: "#224E38",
          900: "#173A2A",
        },
        // Warm slate — text & surfaces (slightly warm, not cold grey)
        slate: {
          50:  "#F8F8FA",
          100: "#F1F1F5",
          200: "#E4E4EC",
          300: "#C8C8D8",
          400: "#9898B0",
          500: "#6B6B88",
          600: "#4E4E6A",
          700: "#373756",
          800: "#232340",
          900: "#14142B",
        },
        // Warm sky — accent surfaces
        sky: {
          50:  "#F0F7FF",
          100: "#E0EFFF",
          200: "#B9DAFF",
          300: "#7DBFFF",
          400: "#3BA0FF",
          500: "#0E80F0",
          600: "#0065CC",
          700: "#0051A3",
          800: "#003D7A",
          900: "#002B57",
        },
        // Accent warm tones
        amber: {
          50:  "#FFFBF0",
          100: "#FFF3D0",
          400: "#FBBC04",
          500: "#F5A623",
          600: "#D4891A",
        },
        teal: {
          50:  "#F0FDFA",
          100: "#CCFBF1",
          500: "#14B8A6",
          600: "#0D9488",
        },
        rose: {
          50:  "#FFF1F2",
          100: "#FFE4E6",
          500: "#F43F5E",
          600: "#E11D48",
        },
        // Brand tokens — sage green
        brand: {
          50:   "#F1F8F4",
          100:  "#DCF0E4",
          200:  "#BBE1CB",
          400:  "#5DB286",
          500:  "#3D9568",
          600:  "#2F7B54",
          700:  "#286244",
          glow: "rgba(61,149,104,0.14)",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px" }],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        "soft-sm": "0 1px 3px rgba(14,14,43,0.04), 0 1px 2px rgba(14,14,43,0.03)",
        "soft":    "0 4px 16px rgba(14,14,43,0.06), 0 1px 4px rgba(14,14,43,0.04)",
        "soft-lg": "0 16px 48px rgba(14,14,43,0.08), 0 4px 16px rgba(14,14,43,0.05)",
        "soft-xl": "0 24px 64px rgba(14,14,43,0.10), 0 8px 24px rgba(14,14,43,0.06)",
        "brand":   "0 8px 28px rgba(47,123,84,0.18), 0 2px 8px rgba(47,123,84,0.10)",
        "brand-lg":"0 16px 44px rgba(47,123,84,0.22), 0 4px 16px rgba(47,123,84,0.13)",
      },
      animation: {
        "fade-up":     "fadeUp 0.5s ease forwards",
        "fade-in":     "fadeIn 0.4s ease forwards",
        "pulse-ring":  "pulseRing 2s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
        "shimmer":     "shimmer 2s linear infinite",
        "typing":      "typing 2.5s steps(40) forwards",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        pulseRing: { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.4", transform: "scale(0.8)" } },
        float:     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        typing:    { from: { width: "0" }, to: { width: "100%" } },
      },
      backgroundImage: {
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      },
      screens: {
        "xs": "390px",
      },
    },
  },
  plugins: [],
};

export default config;
