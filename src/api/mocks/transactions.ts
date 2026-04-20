import { Transaction } from "@/types";

/**
 * Coherencia matemática: suma = S/.123.50 (saldo de Sofi).
 *   50.00 + 30.00 + 25.00 + 15.00 + 3.50 = 123.50 ✓
 */
export const mockTransactions: Transaction[] = [
  {
    id: "t_001",
    childId: "c_001",
    type: "carga",
    amount: 50.0,
    date: "2026-04-10T08:30:00Z",
    concept: "Mesada mensual",
    motivo: "mesada",
    sender: "Papá Andrés",
  },
  {
    id: "t_002",
    childId: "c_001",
    type: "celebracion",
    amount: 30.0,
    date: "2026-03-28T19:15:00Z",
    concept: "Cumpleaños",
    motivo: "celebracion",
    sender: "Abuela Rosa",
  },
  {
    id: "t_003",
    childId: "c_001",
    type: "carga",
    amount: 25.0,
    date: "2026-03-22T12:00:00Z",
    concept: "Domingo",
    motivo: "domingo",
    sender: "Abuelo Pepe",
  },
  {
    id: "t_004",
    childId: "c_001",
    type: "carga",
    amount: 15.0,
    date: "2026-03-15T14:00:00Z",
    concept: "Regalo sorpresa",
    motivo: "regalo",
    sender: "Tío Luis",
  },
  {
    id: "t_005",
    childId: "c_001",
    type: "meta_aporte",
    amount: 3.5,
    date: "2026-03-05T10:45:00Z",
    concept: "Bonus por tarea",
    motivo: "logro",
    sender: "Papá Andrés",
    missionId: "m_001",
  },
];

export const computeBalance = (childId: string): number =>
  mockTransactions
    .filter((t) => t.childId === childId)
    .reduce((acc, t) => acc + t.amount, 0);
