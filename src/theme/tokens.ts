/**
 * Design tokens extraídos directamente de BancaKids.pen
 * Única fuente de verdad para valores que no caben en Tailwind.
 */

export const colors = {
  primary: "#1E69FF",
  primarySoft: "#E1EEFB",
  accent: "#E87C31",
  accentSoft: "#FFF7ED",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textHeading: "#30353B",
  textSecondary: "#5B6473",
  textTertiary: "#374151",
  muted: "#64748B",
  placeholder: "#9CA3AF",
  neutral50: "#F8FAFC",
  neutral100: "#F3F4F6",
  neutral150: "#F0F4F8",
  neutral200: "#E5E7EB",
  neutral250: "#F0F0F0",
  neutral300: "#E2E8F0",
  missionPink: "#F7D1E8",
  missionMint: "#C8F0D8",
  missionPeach: "#FFF7ED",
  missionOrange: "#FFF3E0",
  missionMintBorder: "#C8E6C9",
  missionPeachBorder: "#FDE8D0",
  successBg: "#ECFDF5",
  successBorder: "#A7F3D0",
  warningBg: "#FEF3C7",
  warningBorder: "#FCD34D",
  orange: "#F59E0B",
  purple: "#6C5CE7",
} as const;

export const radius = {
  sm: 11,
  md: 18,
  lg: 24,
  xl: 28,
  screen: 40,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const gradients = {
  celebrate: {
    colors: ["#E87C31", "#F59E0B"] as [string, string],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  celebrateBg: {
    colors: ["#1E69FF", "#6C5CE7"] as [string, string],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  celebArea: {
    colors: ["#E1EEFB", "#C8F0D8"] as [string, string],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
} as const;

export const screen = {
  width: 393,
  height: 852,
} as const;

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  celebrate: {
    shadowColor: "#E87C31",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
  },
} as const;
