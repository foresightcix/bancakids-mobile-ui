import { useState } from "react";
import { SimpleScreen } from "@/components/SimpleScreen";
import { SwitchRow } from "@/components/SwitchRow";

export default function NotificacionesScreen() {
  const [state, setState] = useState({
    insights: true,
    missions: true,
    transactions: true,
    weekly: false,
    marketing: false,
  });

  const set = (k: keyof typeof state, v: boolean) =>
    setState((prev) => ({ ...prev, [k]: v }));

  return (
    <SimpleScreen
      title="Notificaciones"
      subtitle="Elige qué quieres recibir sobre la alcancía de Sofi"
    >
      <SwitchRow
        label="Insights de aprendizaje"
        description="Avisos cuando descubrimos algo nuevo sobre Sofi."
        value={state.insights}
        onValueChange={(v) => set("insights", v)}
      />
      <SwitchRow
        label="Misiones completadas"
        description="Cuando Sofi termina un paso o misión."
        value={state.missions}
        onValueChange={(v) => set("missions", v)}
      />
      <SwitchRow
        label="Movimientos de dinero"
        description="Cargas, aportes y celebraciones."
        value={state.transactions}
        onValueChange={(v) => set("transactions", v)}
      />
      <SwitchRow
        label="Resumen semanal"
        description="Reporte de avance cada domingo."
        value={state.weekly}
        onValueChange={(v) => set("weekly", v)}
      />
      <SwitchRow
        label="Novedades del banco"
        description="Promociones y noticias relacionadas al programa."
        value={state.marketing}
        onValueChange={(v) => set("marketing", v)}
      />
    </SimpleScreen>
  );
}
