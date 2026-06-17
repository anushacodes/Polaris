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
        // Warm blue palette — primary brand
        blue: {
          50:  "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
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
        // Brand tokens
        brand: {
          50:   "#EFF6FF",
          100:  "#DBEAFE",
          200:  "#BFDBFE",
          400:  "#60A5FA",
          500:  "#3B82F6",
          600:  "#2563EB",
          700:  "#1D4ED8",
          glow: "rgba(59,130,246,0.12)",
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
        "brand":   "0 8px 32px rgba(59,130,246,0.20), 0 2px 8px rgba(59,130,246,0.12)",
        "brand-lg":"0 16px 48px rgba(59,130,246,0.25), 0 4px 16px rgba(59,130,246,0.15)",
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
        "hero-gradient": "radial-gradient(ellipse 900px 700px at 70% -5%, rgba(59,130,246,0.10) 0%, transparent 65%), radial-gradient(ellipse 700px 500px at -5% 85%, rgba(14,184,166,0.07) 0%, transparent 65%)",
        "card-gradient": "linear-gradient(135deg, #1a2744 0%, #1e3a8a 50%, #1e40af 100%)",
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
