/**
 * 3 escenarios de práctica por misión/competencia. La alcancía IoT rota
 * 0→1→2 en cada intento nuevo para evitar memorización.
 */
export interface Escenario {
  type: "dilema" | "decision" | "reflexion";
  situation: string;
  insightTemplate: string;
}

export const mockEscenarios: Record<string, Escenario[]> = {
  m_001: [
    {
      type: "dilema",
      situation:
        "\"Tienes S/.20 y quieres comprar un juguete de S/.15 y un helado de S/.8. ¿Qué harías?\"",
      insightTemplate:
        "Sofi reconoció que no alcanza para los dos y priorizó el juguete. Supo identificar una decisión de gasto.",
    },
    {
      type: "decision",
      situation:
        "\"Tu amigo te invita a comprar chocolates pero estás ahorrando para tu bici. ¿Cómo decides?\"",
      insightTemplate:
        "Sofi eligió seguir ahorrando. Identificó que la meta a futuro es más valiosa que un gasto impulsivo.",
    },
    {
      type: "reflexion",
      situation:
        "\"Llevas 2 semanas ahorrando. ¿Por qué crees que vale la pena esperar para comprar algo grande?\"",
      insightTemplate:
        "Sofi explicó con sus palabras que esperar permite conseguir cosas más importantes. Internalizó el concepto.",
    },
  ],
  m_002: [
    {
      type: "dilema",
      situation:
        "\"En el mercado ves una fruta a S/.5 y un paquete de galletas a S/.5. ¿Cuál eliges?\"",
      insightTemplate:
        "Sofi reflexionó sobre qué es necesidad vs. gusto. Pudo argumentar su elección.",
    },
    {
      type: "decision",
      situation:
        "\"Tienes S/.10 de mesada. ¿Cómo divides entre snacks, ahorros y compartir?\"",
      insightTemplate:
        "Sofi distribuyó sin ayuda: ahorró la mitad, gastó un cuarto y separó algo para compartir.",
    },
    {
      type: "reflexion",
      situation:
        "\"La próxima vez que vayas al mercado, ¿qué preguntas te harías antes de comprar?\"",
      insightTemplate:
        "Sofi propuso evaluar precio, necesidad y alternativas — mostró criterio de compra.",
    },
  ],
};

export const getEscenario = (missionId: string, index: number): Escenario => {
  const list = mockEscenarios[missionId] ?? mockEscenarios.m_001;
  return list[index % list.length];
};
