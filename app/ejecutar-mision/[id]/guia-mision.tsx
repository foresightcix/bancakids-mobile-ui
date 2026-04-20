import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChatCircle,
  Clock,
  HandsClapping,
  Heart,
  Lightbulb,
  Prohibit,
  type IconProps,
} from "phosphor-react-native";
import { MisionStepIndicator } from "@/components/MisionStepIndicator";
import { Button } from "@/components/ui/Button";
import { api } from "@/api";
import { useMissionAttempts } from "@/store/missionAttempts";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

const MATERIALES = [
  "Frasco o caja vacía",
  "Stickers",
  "Colores",
  "Tijeras",
];

const RECOMENDACIONES: {
  Icon: React.ComponentType<IconProps>;
  text: string;
}[] = [
  { Icon: HandsClapping, text: "Celebra cada intento, no solo los aciertos" },
  { Icon: Prohibit, text: "No le des las respuestas directamente" },
  { Icon: Lightbulb, text: "Deja que tu hijo tome sus propias decisiones" },
  { Icon: ChatCircle, text: "Haz preguntas abiertas: ¿Qué crees que pasaría si...?" },
  { Icon: Heart, text: "Mantén un ambiente positivo y sin presión" },
];

const PASOS = [
  "Busquen juntos un frasco o caja que puedan decorar.",
  "Decoren la alcancía con stickers, dibujos y colores.",
  "Conversen: ¿Qué sueño les gustaría cumplir ahorrando?",
  "Pongan un nombre a la alcancía y elijan una meta de ahorro.",
  "¡Celebren! La alcancía está lista para empezar a ahorrar.",
];

export default function GuiaMision() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const attempt = useMissionAttempts((s) => s.getCount(id ?? "")) + 1;

  useEffect(() => {
    api.getMissions().then((ms) =>
      setMission(ms.find((m) => m.id === id) ?? null),
    );
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <MisionStepIndicator
        step={3}
        totalSteps={4}
        stepLabel="Guía de la misión"
        backLabel="Guía de la misión"
        attempt={attempt}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {mission?.title ?? "Misión"}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Clock size={16} color={colors.muted} />
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              {mission?.estimatedMinutes ?? 15} minutos
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#F7D1E8",
              borderRadius: 11,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              Fácil
            </Text>
          </View>
        </View>

        {/* Materiales necesarios */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Materiales necesarios
          </Text>
          <View style={{ gap: 4 }}>
            {MATERIALES.map((m) => (
              <Text
                key={m}
                style={{
                  color: colors.textSecondary,
                  fontSize: 14,
                }}
              >
                •  {m}
              </Text>
            ))}
          </View>
        </View>

        {/* Para el padre card */}
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 14,
            padding: 16,
            gap: 6,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Para el padre
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              lineHeight: 20,
            }}
          >
            Esta actividad busca que tu hijo entienda el valor de ahorrar de
            forma divertida. Acompáñalo mientras decora su alcancía y conversen
            sobre sus sueños.
          </Text>

          {/* Recomendaciones card */}
          <View
            style={{
              backgroundColor: "#FFF3E0",
              borderRadius: 14,
              padding: 16,
              gap: 10,
              marginTop: 4,
            }}
          >
            <Text
              style={{
                color: colors.textHeading,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Recomendaciones durante la misión
            </Text>
            {RECOMENDACIONES.map(({ Icon, text }, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <Icon size={20} color={colors.accent} weight="fill" />
                <Text
                  style={{
                    flex: 1,
                    color: colors.textHeading,
                    fontSize: 13,
                    fontWeight: "500",
                    lineHeight: 18,
                  }}
                >
                  {text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pasos */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Pasos
          </Text>
          {PASOS.map((paso, i) => (
            <View
              key={i}
              style={{
                backgroundColor: colors.neutral100,
                borderRadius: 11,
                padding: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 11,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  color: colors.textPrimary,
                  fontSize: 13,
                  lineHeight: 18,
                }}
              >
                {paso}
              </Text>
            </View>
          ))}
        </View>

        {/* Tip card */}
        <View
          style={{
            backgroundColor: "#F7D1E8",
            borderRadius: 14,
            padding: 14,
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Lightbulb size={20} color={colors.textTertiary} weight="fill" />
          <Text
            style={{
              flex: 1,
              color: colors.textPrimary,
              fontSize: 13,
              lineHeight: 20,
            }}
          >
            No importa si la meta es un juguete poco importante. Lo valioso es
            que aprendan el hábito de guardar dinero para algo que quieren.
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label="Continuar a la misión →"
          variant="primary"
          size="md"
          fullWidth
          onPress={() => router.push(`/ejecutar-mision/${id}/activa` as never)}
        />
      </View>
    </View>
  );
}
