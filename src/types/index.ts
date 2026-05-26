export type ID = string;

export interface Parent {
  id: ID;
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
}

export interface Child {
  /** Child user id (`user_id` on backend). */
  id: ID;
  /** Child profile id (`user_profiles_child.id`). */
  profileId: ID;
  /** SIMPLE account id for deposits. */
  accountId: ID;
  name: string;
  age: number;
  avatarColor: string;
  piggyConnected: boolean;
  balance: number;
}

export type TransactionType = "carga" | "meta_aporte" | "celebracion" | "gasto";

export interface Transaction {
  id: ID;
  childId: ID;
  type: TransactionType;
  amount: number;
  date: string;
  concept: string;
  motivo?: string;
  sender?: string;
  goalId?: ID;
  missionId?: ID;
}

export type MissionStatus = "active" | "in_progress" | "locked" | "completed";
export type MissionCategory = "ahorrar" | "gastar_bien" | "compartir" | "ganar";

export interface Mission {
  id: ID;
  title: string;
  description: string;
  category: MissionCategory;
  status: MissionStatus;
  progress: number;
  totalSteps: number;
  currentStep: number;
  estimatedMinutes: number;
  emoji: string;
  bgColor: string;
  borderColor: string;
  tagLabel: string;
  tagBg: string;
  insight?: string;
}

export interface SavingGoal {
  id: ID;
  childId: ID;
  title: string;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
  deadline?: string;
  completed: boolean;
}

export interface Competencia {
  id: ID;
  name: string;
  description: string;
  progress: number;
  level: "inicial" | "avanzando" | "dominando";
  color: string;
  icon: string;
}

export interface WeeklySummary {
  from: string;
  to: string;
  label: string;
  interactions: number;
  minutes: number;
  missionsCompleted: number;
}

export interface Notification {
  id: ID;
  type: "mission" | "transaction" | "insight" | "system";
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export interface Insight {
  id: ID;
  date: string;
  childId: ID;
  missionId?: ID;
  /** Competencia asociada (ej. "Valorar el valor del dinero") */
  competencia?: string;
  /** Capacidad (ej. "Ahorrar") */
  capacidad?: string;
  /** Tipo de interacción que produjo el insight */
  origen?: "mision" | "escenario";
  /** Número de intento (1-based) */
  intento?: number;
  title: string;
  body: string;
  tag: string;
}
