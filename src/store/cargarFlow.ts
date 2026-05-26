import { create } from "zustand";

export type CargarMotivo =
  | "propina"
  | "ayudo_casa"
  | "cumpleanos"
  | "comportamiento"
  | "mesada"
  | "otro";

export type CargarSender =
  | "mama"
  | "papa"
  | "abuelo"
  | "abuela"
  | "tio"
  | "otro";

export type CargarDestinoTipo = "alcancia" | "meta";

interface CargarFlowState {
  amount: number | null;
  motivo: CargarMotivo | null;
  destinoTipo: CargarDestinoTipo;
  destinoMetaId: string | null;
  destinoMetaTitle: string;
  sender: CargarSender | null;
  otroSender: string;
  setAmount: (v: number) => void;
  setMotivo: (v: CargarMotivo) => void;
  setDestinoAlcancia: () => void;
  setDestinoMeta: (id: string, title: string) => void;
  setSender: (v: CargarSender) => void;
  setOtroSender: (v: string) => void;
  reset: () => void;
}

export const useCargarFlow = create<CargarFlowState>((set) => ({
  amount: null,
  motivo: null,
  destinoTipo: "alcancia",
  destinoMetaId: null,
  destinoMetaTitle: "",
  sender: null,
  otroSender: "",
  setAmount: (amount) => set({ amount }),
  setMotivo: (motivo) => set({ motivo }),
  setDestinoAlcancia: () =>
    set({ destinoTipo: "alcancia", destinoMetaId: null, destinoMetaTitle: "" }),
  setDestinoMeta: (id, title) =>
    set({ destinoTipo: "meta", destinoMetaId: id, destinoMetaTitle: title }),
  setSender: (sender) => set({ sender }),
  setOtroSender: (otroSender) => set({ otroSender }),
  reset: () =>
    set({
      amount: null,
      motivo: null,
      destinoTipo: "alcancia",
      destinoMetaId: null,
      destinoMetaTitle: "",
      sender: null,
      otroSender: "",
    }),
}));

export const motivoLabel: Record<CargarMotivo, string> = {
  propina: "Propina",
  ayudo_casa: "Ayudó en casa",
  cumpleanos: "Cumpleaños",
  comportamiento: "Comportamiento",
  mesada: "Mesada",
  otro: "Otro",
};

export const senderLabel: Record<CargarSender, string> = {
  mama: "Mamá",
  papa: "Papá",
  abuelo: "Abuelo",
  abuela: "Abuela",
  tio: "Tío",
  otro: "Otro",
};
