import { create } from "zustand";

export type AttemptType = "mission" | "escenario";

interface AttemptState {
  count: number;
  lastType?: AttemptType;
  /** Índice rotativo 0/1/2 para elegir escenario distinto cada vez */
  escenarioIndex: number;
}

interface State {
  byMission: Record<string, AttemptState>;
  /** Registra un nuevo intento y devuelve el número final */
  recordAttempt: (missionId: string, type: AttemptType) => number;
  /** Solo lee el count actual (sin incrementar) */
  getCount: (missionId: string) => number;
  /** Índice del siguiente escenario — rota 0→1→2→0 para evitar memorización */
  getNextEscenarioIndex: (missionId: string) => number;
}

export const useMissionAttempts = create<State>((set, get) => ({
  byMission: {
    // Demo seed: m_001 ya tiene 1 intento completado
    m_001: { count: 1, lastType: "mission", escenarioIndex: 0 },
  },
  recordAttempt: (missionId, type) => {
    const current = get().byMission[missionId] ?? {
      count: 0,
      escenarioIndex: 0,
    };
    const newCount = current.count + 1;
    const newIndex =
      type === "escenario" ? (current.escenarioIndex + 1) % 3 : current.escenarioIndex;
    set({
      byMission: {
        ...get().byMission,
        [missionId]: {
          count: newCount,
          lastType: type,
          escenarioIndex: newIndex,
        },
      },
    });
    return newCount;
  },
  getCount: (missionId) => get().byMission[missionId]?.count ?? 0,
  getNextEscenarioIndex: (missionId) =>
    get().byMission[missionId]?.escenarioIndex ?? 0,
}));
