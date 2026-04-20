import { Mission } from "@/types";

/**
 * Nombres y badges extraídos directamente del diseño Enseñar 1 - Hub de Misiones.
 */
export const mockMissions: Mission[] = [
  {
    id: "m_001",
    title: "Valorar el valor del dinero",
    description:
      "Sofi aprende qué es ahorrar y por qué guardar monedas tiene superpoderes.",
    category: "ahorrar",
    status: "in_progress",
    currentStep: 2,
    totalSteps: 3,
    progress: 67,
    estimatedMinutes: 10,
    emoji: "🐷",
    bgColor: "#FFFFFF",
    borderColor: "#E87C31",
    tagLabel: "Intento 2",
    tagBg: "#FFF3E0",
    insight:
      "Sofi ya reconoce que ahorrar no es dejar de tener, es esperar para tener más.",
  },
  {
    id: "m_002",
    title: "De compras en el mercado",
    description:
      "Gastar bien: elegir entre necesidades y deseos en el mercado familiar.",
    category: "gastar_bien",
    status: "in_progress",
    currentStep: 1,
    totalSteps: 3,
    progress: 33,
    estimatedMinutes: 15,
    emoji: "🛒",
    bgColor: "#FFFFFF",
    borderColor: "#C8E6C9",
    tagLabel: "Intento 1",
    tagBg: "#E8F5E9",
  },
  {
    id: "m_003",
    title: "Regalos con sentido",
    description:
      "Descubre por qué compartir fortalece los lazos familiares y las amistades.",
    category: "compartir",
    status: "locked",
    currentStep: 0,
    totalSteps: 4,
    progress: 0,
    estimatedMinutes: 12,
    emoji: "🎁",
    bgColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    tagLabel: "Bloqueada",
    tagBg: "#F3F4F6",
  },
  {
    id: "m_004",
    title: "Mi primera limonada",
    description:
      "Aprender a ganar dinero honesto ofreciendo algo que los demás valoran.",
    category: "ganar",
    status: "locked",
    currentStep: 0,
    totalSteps: 5,
    progress: 0,
    estimatedMinutes: 20,
    emoji: "🍋",
    bgColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    tagLabel: "Bloqueada",
    tagBg: "#F3F4F6",
  },
];
