import { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "n_001",
    type: "insight",
    title: "Nuevo insight de Sofi",
    body: "Sofi prefirió esperar para comprar su bici. Mira lo que aprendió.",
    date: "2026-04-18T17:20:00Z",
    read: false,
  },
  {
    id: "n_002",
    type: "mission",
    title: "Misión completada",
    body: "Sofi terminó el primer paso de 'Alcancía mágica'. ¡Sigue así!",
    date: "2026-04-17T09:00:00Z",
    read: false,
  },
  {
    id: "n_003",
    type: "transaction",
    title: "Nueva carga",
    body: "La Abuela Rosa envió $15 a la alcancía de Sofi.",
    date: "2026-03-28T19:15:00Z",
    read: true,
  },
];
