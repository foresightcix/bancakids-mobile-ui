import { Competencia, WeeklySummary, Insight } from "@/types";

/**
 * Valores exactos del Monitorear - Summary Card:
 *   12 Interacciones · 45 Minutos · 3 Misiones · 16 - 22 Mar
 * Competencias:
 *   El ahorro 75% · Necesidades vs. gustos 40%
 */
export const mockCompetencias: Competencia[] = [
  {
    id: "cp_001",
    name: "El ahorro",
    description: "Guardar hoy para algo más grande mañana.",
    progress: 75,
    level: "avanzando",
    color: "#1E69FF",
    icon: "coin",
  },
  {
    id: "cp_002",
    name: "Necesidades vs. gustos",
    description: "Distinguir qué es imprescindible y qué es un antojo.",
    progress: 40,
    level: "inicial",
    color: "#E87C31",
    icon: "scales",
  },
  {
    id: "cp_003",
    name: "Gastar bien",
    description: "Elegir con criterio y comparar antes de comprar.",
    progress: 45,
    level: "inicial",
    color: "#6C5CE7",
    icon: "wallet",
  },
  {
    id: "cp_004",
    name: "Compartir",
    description: "Aprender la generosidad como parte del dinero.",
    progress: 20,
    level: "inicial",
    color: "#10B981",
    icon: "hand-heart",
  },
];

export const mockWeeklySummary: WeeklySummary = {
  from: "2026-03-16",
  to: "2026-03-22",
  label: "16 - 22 Mar",
  interactions: 12,
  minutes: 45,
  missionsCompleted: 3,
};

/**
 * Historial acumulativo por competencia. Cada insight es de un intento,
 * puede venir de misión (feedback niño + padre) o escenario de práctica IoT.
 */
export const mockInsights: Insight[] = [
  {
    id: "in_001",
    date: "2026-04-18T17:20:00Z",
    childId: "c_001",
    missionId: "m_001",
    competencia: "Valorar el valor del dinero",
    capacidad: "Ahorrar",
    origen: "escenario",
    intento: 3,
    title: "Eligió seguir ahorrando antes que un gasto impulsivo",
    body:
      "En el escenario 'Tu amigo te invita a comprar chocolates...', Sofi decidió seguir ahorrando. Identificó que la meta a futuro es más valiosa que un gasto impulsivo.",
    tag: "Valorar el valor del dinero",
  },
  {
    id: "in_002",
    date: "2026-04-14T12:05:00Z",
    childId: "c_001",
    missionId: "m_001",
    competencia: "Valorar el valor del dinero",
    capacidad: "Ahorrar",
    origen: "mision",
    intento: 2,
    title: "Propuso una meta de ahorro propia",
    body:
      "En el intento 2 de la misión 'Valorar el valor del dinero', Sofi decoró su alcancía y propuso ahorrar para un libro. Sin intervención.",
    tag: "Valorar el valor del dinero",
  },
  {
    id: "in_003",
    date: "2026-04-09T19:45:00Z",
    childId: "c_001",
    missionId: "m_001",
    competencia: "Valorar el valor del dinero",
    capacidad: "Ahorrar",
    origen: "mision",
    intento: 1,
    title: "Reconoce el valor del ahorro",
    body:
      "Primer intento: Sofi demostró entender el concepto de ahorro al crear metas visuales. Identificó correctamente que ahorrar sirve para cumplir sueños.",
    tag: "Valorar el valor del dinero",
  },
  {
    id: "in_004",
    date: "2026-04-05T11:00:00Z",
    childId: "c_001",
    missionId: "m_002",
    competencia: "Necesidades vs. gustos",
    capacidad: "Gastar bien",
    origen: "mision",
    intento: 1,
    title: "Ya distingue entre querer y necesitar",
    body:
      "En el mercado dudó entre manzanas y caramelos. Terminó eligiendo la fruta porque 'el cuerpo también se alimenta'.",
    tag: "Necesidades vs. gustos",
  },
];
