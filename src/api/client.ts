import {
  mockParent,
  mockChild,
  mockTransactions,
  mockMissions,
  mockGoals,
  mockCompetencias,
  mockWeeklySummary,
  mockInsights,
  mockNotifications,
  computeBalance,
} from "./mocks";
import type { Transaction } from "@/types";

/** Toggle para simular fallos de red (útil para demo / probar ErrorState). */
let failMode = false;
export const __setFailMode = (v: boolean) => {
  failMode = v;
};
export const __getFailMode = () => failMode;

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const maybeFail = async () => {
  if (failMode) {
    await delay(300);
    throw new Error("NETWORK_ERROR");
  }
};

export const api = {
  async getParent() {
    await delay(300);
    await maybeFail();
    return mockParent;
  },
  async getChild() {
    await delay(400);
    await maybeFail();
    return { ...mockChild, balance: computeBalance(mockChild.id) };
  },
  async getTransactions() {
    await delay(500);
    await maybeFail();
    return [...mockTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },
  async getMissions() {
    await delay(450);
    await maybeFail();
    return mockMissions;
  },
  async getGoals() {
    await delay(350);
    await maybeFail();
    return mockGoals;
  },
  async getCompetencias() {
    await delay(400);
    await maybeFail();
    return mockCompetencias;
  },
  async getWeeklySummary() {
    await delay(300);
    await maybeFail();
    return mockWeeklySummary;
  },
  async getInsights() {
    await delay(400);
    await maybeFail();
    return [...mockInsights].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },
  async getNotifications() {
    await delay(300);
    await maybeFail();
    return mockNotifications;
  },
  async cargarDinero(
    amount: number,
    motivo: string,
    sender: string,
    metaId?: string | null,
  ): Promise<Transaction> {
    await delay(1000);
    await maybeFail();
    return {
      id: `t_${Date.now()}`,
      childId: mockChild.id,
      type: metaId ? "meta_aporte" : "carga",
      amount,
      date: new Date().toISOString(),
      concept: motivo,
      motivo,
      sender,
      ...(metaId ? { goalId: metaId } : {}),
    };
  },
  async login(_email: string, _password: string) {
    await delay(1000);
    await maybeFail();
    return { token: "fake_jwt_token", parent: mockParent };
  },
};
