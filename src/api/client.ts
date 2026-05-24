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
import { isMock, request, withBackend } from "./http";
import { useAuthStore } from "@/store/auth";
import type { Parent, Transaction } from "@/types";

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

const mockStep = async (ms: number) => {
  await delay(ms);
  await maybeFail();
};

type LoginResponse = {
  token: string;
  user: Parent;
};

type RefreshResponse = {
  access_token: string;
};

function toParent(user: Partial<Parent> & Pick<Parent, "id" | "name" | "email">): Parent {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    avatarUrl: user.avatarUrl,
  };
}

export const api = {
  async getParent() {
    return withBackend(
      async () => {
        await mockStep(300);
        return mockParent;
      },
      () => request<Parent>("/me"),
    );
  },
  async getChild() {
    return withBackend(
      async () => {
        await mockStep(400);
        return { ...mockChild, balance: computeBalance(mockChild.id) };
      },
      async () => {
        const child = await request<
          Omit<typeof mockChild, "balance"> & { balance?: number }
        >("/child");
        return {
          ...child,
          balance: child.balance ?? computeBalance(child.id),
        };
      },
    );
  },
  async getTransactions() {
    return withBackend(
      async () => {
        await mockStep(500);
        return [...mockTransactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      },
      async () => {
        const transactions = await request<Transaction[]>("/transactions");
        return transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      },
    );
  },
  async getMissions() {
    return withBackend(
      async () => {
        await mockStep(450);
        return mockMissions;
      },
      () => request("/missions"),
    );
  },
  async getGoals() {
    return withBackend(
      async () => {
        await mockStep(350);
        return mockGoals;
      },
      () => request("/goals"),
    );
  },
  async getCompetencias() {
    return withBackend(
      async () => {
        await mockStep(400);
        return mockCompetencias;
      },
      () => request("/competencies"),
    );
  },
  async getWeeklySummary() {
    return withBackend(
      async () => {
        await mockStep(300);
        return mockWeeklySummary;
      },
      () => request("/summary/weekly"),
    );
  },
  async getInsights() {
    return withBackend(
      async () => {
        await mockStep(400);
        return [...mockInsights].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      },
      async () => {
        const insights = await request<typeof mockInsights>("/insights");
        return insights.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      },
    );
  },
  async getNotifications() {
    return withBackend(
      async () => {
        await mockStep(300);
        return mockNotifications;
      },
      () => request("/notifications"),
    );
  },
  async cargarDinero(
    amount: number,
    motivo: string,
    sender: string,
  ): Promise<Transaction> {
    return withBackend<Transaction>(
      async () => {
        await mockStep(1000);
        return {
          id: `t_${Date.now()}`,
          childId: mockChild.id,
          type: "carga",
          amount,
          date: new Date().toISOString(),
          concept: motivo,
          motivo,
          sender,
        };
      },
      () =>
        request<Transaction>("/transactions/charge", {
          method: "POST",
          body: JSON.stringify({ amount, motivo, sender }),
        }),
    );
  },
  async login(email: string, password: string) {
    return withBackend(
      async () => {
        await mockStep(1000);
        const result = { token: "fake_jwt_token", parent: mockParent };
        useAuthStore.getState().setSession(result.parent, result.token);
        return result;
      },
      async () => {
        const data = await request<LoginResponse>("/auth/login", {
          method: "POST",
          skipAuth: true,
          body: JSON.stringify({ email, password }),
        });
        const parent = toParent(data.user);
        useAuthStore.getState().setSession(parent, data.token);
        return { token: data.token, parent };
      },
    );
  },
  async refreshToken() {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error("NO_TOKEN");
    }

    return withBackend(
      async () => {
        await mockStep(300);
        return token;
      },
      async () => {
        const data = await request<RefreshResponse>("/auth/refresh", {
          method: "POST",
          skipAuth: true,
          body: JSON.stringify({ token }),
        });
        useAuthStore.getState().setToken(data.access_token);
        return data.access_token;
      },
    );
  },
  async logout() {
    const { token, clearSession } = useAuthStore.getState();

    try {
      if (isMock()) {
        await mockStep(300);
      } else if (token) {
        await request("/auth/logout", {
          method: "POST",
          skipAuth: true,
          body: JSON.stringify({ token }),
        });
      }
    } finally {
      clearSession();
    }
  },
};
