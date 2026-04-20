import { SavingGoal } from "@/types";

/**
 * Meta primaria "Bicicleta nueva" tomada del Monitorear - Metas de ahorro:
 *   S/.88 de S/.150 = 59% completado · Quedan 12 días · Vence 30 Abr
 */
export const mockGoals: SavingGoal[] = [
  {
    id: "g_001",
    childId: "c_001",
    title: "Bicicleta nueva",
    emoji: "🚲",
    targetAmount: 150.0,
    currentAmount: 88.0,
    color: "#E1EEFB",
    deadline: "2026-04-30",
    completed: false,
  },
  {
    id: "g_002",
    childId: "c_001",
    title: "Videojuego",
    emoji: "🎮",
    targetAmount: 200.0,
    currentAmount: 25.0,
    color: "#FFF3E0",
    deadline: "2026-05-20",
    completed: false,
  },
  {
    id: "g_003",
    childId: "c_001",
    title: "Patines",
    emoji: "⛸️",
    targetAmount: 80.0,
    currentAmount: 80.0,
    color: "#DCFCE7",
    deadline: "2026-02-10",
    completed: true,
  },
  {
    id: "g_004",
    childId: "c_001",
    title: "Libro de cuentos",
    emoji: "📚",
    targetAmount: 35.0,
    currentAmount: 35.0,
    color: "#DCFCE7",
    deadline: "2026-01-15",
    completed: true,
  },
  {
    id: "g_005",
    childId: "c_001",
    title: "Set de arte",
    emoji: "🎨",
    targetAmount: 40.0,
    currentAmount: 40.0,
    color: "#DCFCE7",
    deadline: "2025-12-20",
    completed: true,
  },
];
