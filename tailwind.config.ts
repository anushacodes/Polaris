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
        // Poppy, juicy green — primary brand
        // (key kept as `blue` so existing `blue-*` classes recolor cohesively)
        blue: {
          50:  "#EDFBF1",
          100: "#D2F4DC",
          200: "#A6E8BB",
          300: "#6FD891",
          400: "#3FC36C",
          500: "#1FA958",
          600: "#138A47",
          700: "#136E3B",
          800: "#13562F",
          900: "#0F4126",
        },
        // Warm neutral — text & cream surfaces (cozy, not cold grey)
        slate: {
          50:  "#FBF7F0",
          100: "#F4EEE3",
          200: "#EAE1D2",
          300: "#D6C9B5",
          400: "#A89C88",
          500: "#76695A",
          600: "#564B3E",
          700: "#3C342A",
          800: "#27211A",
          900: "#1A1510",
        },
        // Sunny accent — surfaces & highlights
        sky: {
          50:  "#FFF8EC",
          100: "#FFEFCF",
          200: "#FFDD9C",
          300: "#FFC85E",
          400: "#FFB22E",
          500: "#FB9A0E",
          600: "#E07C00",
          700: "#B86100",
          800: "#8F4B00",
          900: "#5C3100",
        },
        // Sunny amber pop
        amber: {
          50:  "#FFF8EC",
          100: "#FFEDCB",
          400: "#FFBE3D",
          500: "#FBA515",
          600: "#E08600",
        },
        // Fresh teal pop
        teal: {
          50:  "#EBFBF6",
          100: "#C9F3E6",
          500: "#13B894",
          600: "#0C9678",
        },
        // Coral / warm pink pop
        rose: {
          50:  "#FFF1ED",
          100: "#FFDED4",
          500: "#FF6B53",
          600: "#F04E33",
        },
        // Brand tokens — poppy green
        brand: {
          50:   "#EDFBF1",
          100:  "#D2F4DC",
          200:  "#A6E8BB",
          400:  "#3FC36C",
          500:  "#1FA958",
          600:  "#138A47",
          700:  "#136E3B",
          glow: "rgba(31,169,88,0.18)",
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
        "xl":  "16px",
        "2xl": "22px",
        "3xl": "30px",
        "4xl": "40px",
      },
      boxShadow: {
        "soft-sm": "0 2px 6px rgba(60,52,42,0.05), 0 1px 2px rgba(60,52,42,0.04)",
        "soft":    "0 6px 20px rgba(60,52,42,0.07), 0 2px 6px rgba(60,52,42,0.05)",
        "soft-lg": "0 18px 50px rgba(60,52,42,0.10), 0 6px 18px rgba(60,52,42,0.06)",
        "soft-xl": "0 28px 70px rgba(60,52,42,0.12), 0 10px 28px rgba(60,52,42,0.07)",
        "brand":   "0 10px 30px rgba(31,169,88,0.24), 0 3px 10px rgba(31,169,88,0.14)",
        "brand-lg":"0 18px 48px rgba(31,169,88,0.28), 0 6px 18px rgba(31,169,88,0.16)",
        "pop":     "0 8px 0 0 rgba(19,138,71,0.18)",
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
