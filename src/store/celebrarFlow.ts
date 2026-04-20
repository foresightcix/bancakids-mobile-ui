import { create } from "zustand";

export type CelebMotivo =
  | "completo_meta"
  | "buen_comportamiento"
  | "ayudo_mucho"
  | "cumple"
  | "otro";

export type CelebModo = "cargar" | "experiencia" | "mensaje";

interface CelebFlowState {
  motivo: CelebMotivo | null;
  modo: CelebModo | null;
  monto: number | null;
  experiencia: string;
  mensaje: string;
  setMotivo: (v: CelebMotivo) => void;
  setModo: (v: CelebModo) => void;
  setMonto: (v: number) => void;
  setExperiencia: (v: string) => void;
  setMensaje: (v: string) => void;
  reset: () => void;
}

export const useCelebrarFlow = create<CelebFlowState>((set) => ({
  motivo: null,
  modo: null,
  monto: null,
  experiencia: "",
  mensaje: "",
  setMotivo: (motivo) => set({ motivo }),
  setModo: (modo) => set({ modo }),
  setMonto: (monto) => set({ monto }),
  setExperiencia: (experiencia) => set({ experiencia }),
  setMensaje: (mensaje) => set({ mensaje }),
  reset: () =>
    set({
      motivo: null,
      modo: null,
      monto: null,
      experiencia: "",
      mensaje: "",
    }),
}));

export const celebMotivoLabel: Record<CelebMotivo, string> = {
  completo_meta: "Completó una meta",
  buen_comportamiento: "Buen comportamiento",
  ayudo_mucho: "Ayudó mucho en casa",
  cumple: "Cumpleaños",
  otro: "Otro motivo",
};
