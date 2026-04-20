import { create } from "zustand";

interface OnboardingState {
  phone: string;
  otp: string[];
  prioridades: string[];
  pairingMethod: "qr" | "codigo" | null;
  codigoAlcancia: string;
  wifiSSID: string;
  wifiPassword: string;
  setPhone: (v: string) => void;
  setOtp: (v: string[]) => void;
  togglePrioridad: (id: string) => void;
  setPairingMethod: (v: "qr" | "codigo") => void;
  setCodigoAlcancia: (v: string) => void;
  setWifi: (ssid: string, password: string) => void;
  reset: () => void;
}

export const useOnboardingFlow = create<OnboardingState>((set, get) => ({
  phone: "987654321",
  otp: ["", "", "", "", "", ""],
  prioridades: ["esperar", "metas", "decisiones"],
  pairingMethod: null,
  codigoAlcancia: "",
  wifiSSID: "Casa_WiFi_5G",
  wifiPassword: "",
  setPhone: (phone) => set({ phone }),
  setOtp: (otp) => set({ otp }),
  togglePrioridad: (id) => {
    const current = get().prioridades;
    if (current.includes(id)) {
      set({ prioridades: current.filter((p) => p !== id) });
    } else if (current.length < 3) {
      set({ prioridades: [...current, id] });
    }
  },
  setPairingMethod: (pairingMethod) => set({ pairingMethod }),
  setCodigoAlcancia: (codigoAlcancia) => set({ codigoAlcancia }),
  setWifi: (wifiSSID, wifiPassword) => set({ wifiSSID, wifiPassword }),
  reset: () =>
    set({
      phone: "987654321",
      otp: ["", "", "", "", "", ""],
      prioridades: [],
      pairingMethod: null,
      codigoAlcancia: "",
      wifiSSID: "Casa_WiFi_5G",
      wifiPassword: "",
    }),
}));
