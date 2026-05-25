import { Mission } from "@/types";

/**
 * Estados:
 *  - active     → sin intentos aún (badge "Empezar"). Demo del primer intento.
 *  - in_progress→ con uno o más intentos previos (continuar/redo).
 *  - completed  → todos los intentos terminados.
 *  - locked     → no disponible aún.
 */
export const mockMissions: Mission[] = [
  // ─── Activas SIN intentos previos (demo flujo "primera vez") ───
  {
    id: "m_005",
    title: "Reconocer billetes y monedas",
    description:
      "Sofi aprende a identificar y nombrar las monedas y billetes con los que conviven cada día.",
    category: "ahorrar",
    status: "active",
    currentStep: 0,
    totalSteps: 4,
    progress: 0,
    estimatedMinutes: 10,
    emoji: "💵",
    bgColor: "#FFFFFF",
    borderColor: "#1E69FF",
    tagLabel: "Empezar",
    tagBg: "#E1EEFB",
  },
  {
    id: "m_006",
    title: "Mi primera compra responsable",
    description:
      "Practicar antes de comprar: parar, pensar y elegir si vale la pena.",
    category: "gastar_bien",
    status: "active",
    currentStep: 0,
    totalSteps: 3,
    progress: 0,
    estimatedMinutes: 12,
    emoji: "🛍️",
    bgColor: "#FFFFFF",
    borderColor: "#2E7D32",
    tagLabel: "Empezar",
    tagBg: "#E8F5E9",
  },

  // ─── In progress (intentos previos · demo flujo redo) ───
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

  // ─── Bloqueadas ───
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
