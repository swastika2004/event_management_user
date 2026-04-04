/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        dark: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1a1a26",
          600: "#22222f",
          500: "#2e2e3e",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 30% 40%, rgba(249,115,22,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.12) 0%, transparent 60%), linear-gradient(135deg, #0a0a0f 0%, #12121a 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideRight: {
          from: { opacity: 0, transform: "translateX(-24px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(249,115,22,0.25)",
        "glow-sm": "0 0 20px rgba(249,115,22,0.15)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
