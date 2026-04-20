/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand - extraídos directamente del .pen
        primary: {
          DEFAULT: "#1E69FF",
          50: "#E1EEFB",
          100: "#C7DCF7",
          500: "#1E69FF",
          600: "#1654D6",
          700: "#0F3FA3",
        },
        accent: {
          DEFAULT: "#E87C31",
          50: "#FFF7ED",
          100: "#FDE8D0",
          500: "#E87C31",
          600: "#C4661F",
        },
        surface: "#FFFFFF",
        "bg-soft": "#E1EEFB",
        ink: {
          900: "#1A1A1A",
          800: "#30353B",
          700: "#374151",
          500: "#5B6473",
          400: "#64748B",
          300: "#9CA3AF",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F3F4F6",
          150: "#F0F4F8",
          200: "#E5E7EB",
          250: "#F0F0F0",
          300: "#E2E8F0",
        },
        success: {
          50: "#ECFDF5",
          200: "#A7F3D0",
          500: "#10B981",
        },
        warning: {
          50: "#FEF3C7",
          200: "#FCD34D",
        },
        mission: {
          pink: "#F7D1E8",
          mint: "#C8F0D8",
          peach: "#FFF7ED",
          orange: "#FFF3E0",
          mintBorder: "#C8E6C9",
          peachBorder: "#FDE8D0",
        },
      },
      fontFamily: {
        sans: ["Flexo_400", "System"],
        flexo: ["Flexo_400", "System"],
        "flexo-medium": ["Flexo_500", "System"],
        "flexo-semibold": ["Flexo_600", "System"],
        "flexo-bold": ["Flexo_700", "System"],
      },
      fontSize: {
        xxs: ["11px", { lineHeight: "14px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "18px" }],
        base: ["14px", { lineHeight: "20px" }],
        md: ["16px", { lineHeight: "22px" }],
        lg: ["18px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "26px" }],
        "2xl": ["24px", { lineHeight: "30px" }],
        "4xl": ["36px", { lineHeight: "42px" }],
        "5xl": ["40px", { lineHeight: "46px" }],
      },
      borderRadius: {
        sm: "11px",
        md: "18px",
        lg: "24px",
        xl: "28px",
        screen: "40px",
      },
      spacing: {
        4.5: "18px",
      },
    },
  },
  plugins: [],
};
