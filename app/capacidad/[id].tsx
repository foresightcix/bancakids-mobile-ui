import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowUp,
  ChatCircleText,
  CheckCircle,
  Circle,
  Info,
  Lightbulb,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { IconCircle } from "@/components/ui/IconCircle";
import { api } from "@/api";
import type { Competencia } from "@/types";
import { colors } from "@/theme/tokens";
import { BottomTabBar } from "@/components/BottomTabBar";

interface Evidence {
  checked: boolean;
  title: string;
  date: string;
}

const DEFAULT_EVIDENCE: Evidence[] = [
  {
    checked: true,
    title: "Mantuvo dinero en la alcancía 14 días consecutivos",
    date: "Esta semana",
  },
  {
    checked: true,
    title: "Completó la misión '¿Lo necesito o lo quiero?'",
    date: "Hace 3 semanas",
  },
  {
    checked: true,
    title: "Preguntó si debería esperar antes de gastar",
    date: "Hace 2 semanas",
  },
  {
    checked: false,
    title: "Retiró dinero antes de llegar a su meta",
    date: "Hace 1 semana — esto también es data",
  },
];

export default function CapacidadDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cap, setCap] = useState<Competencia | null>(null);

  useEffect(() => {
    api.getCompetencias().then((cs) => {
      // Intenta match por id; si no hay, usa la primera (demo)
      setCap(cs.find((c) => c.id === id) ?? cs[0] ?? null);
    });
  }, [id]);

  if (!cap) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <AppHeader variant="secondary" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.muted }}>Cargando capacidad…</Text>
        </View>
      </View>
    );
  }

  const level = 2;
  const totalLevels = 4;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />

      {/* Back Nav row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Capacidades
          </Text>
        </Pressable>
        <IconCircle size={34} bg={colors.neutral100} borderColor={colors.neutral250}>
          <Info size={18} color={colors.muted} />
        </IconCircle>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 24,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cap Header */}
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Control del impulso
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            La capacidad de esperar antes de gastar. De elegir el después sobre
            el ahora.
          </Text>
        </View>

        {/* Level Badge */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colors.primarySoft,
              borderRadius: 11,
              paddingVertical: 6,
              paddingHorizontal: 14,
            }}
          >
            <Text
              style={{ color: colors.primary, fontSize: 12, fontWeight: "700" }}
            >
              Nivel {level} de {totalLevels}
            </Text>
          </View>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Practicando
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <ArrowUp size={14} color={colors.primary} weight="bold" />
            <Text
              style={{ color: colors.primary, fontSize: 12, fontWeight: "600" }}
            >
              subió
            </Text>
          </View>
        </View>

        {/* Qué significa */}
        <View
          style={{
            backgroundColor: colors.neutral100,
            borderRadius: 14,
            padding: 16,
            gap: 8,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "700",
            }}
          >
            Qué significa
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 21,
            }}
          >
            Sofi ya entiende la idea de esperar. Lo intenta, pero todavía
            necesita apoyo y a veces el impulso gana.
          </Text>
        </View>

        {/* Qué vendrá después */}
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 14,
            padding: 16,
            gap: 8,
          }}
        >
          <Text
            style={{ color: colors.primary, fontSize: 13, fontWeight: "700" }}
          >
            Qué vendrá después
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 21,
            }}
          >
            Cuando llegue al nivel 3, la verás guardar dinero de manera
            consistente sin que nadie se lo recuerde.
          </Text>
        </View>

        {/* Evidencia */}
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Evidencia
          </Text>
          {DEFAULT_EVIDENCE.map((ev, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              {ev.checked ? (
                <CheckCircle size={18} color={colors.primary} weight="fill" />
              ) : (
                <Circle size={18} color={colors.muted} />
              )}
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: ev.checked
                      ? colors.textPrimary
                      : colors.textSecondary,
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 18,
                  }}
                >
                  {ev.title}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 12,
                  }}
                >
                  {ev.date}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Qué puedes hacer como padre */}
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Qué puedes hacer como padre
          </Text>

          {/* Tip 1 - pink */}
          <View
            style={{
              backgroundColor: "#F7D1E8",
              borderRadius: 11,
              padding: 14,
              gap: 6,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Lightbulb size={14} color={colors.textTertiary} weight="fill" />
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                Consejo 1
              </Text>
            </View>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              Cuando deposite sin que se lo recuerdes, nótalo en voz alta: "Vi
              que guardaste hoy. ¿Lo decidiste tú sola?"
            </Text>
          </View>

          {/* Tip 2 - gray */}
          <View
            style={{
              backgroundColor: colors.neutral100,
              borderRadius: 11,
              padding: 14,
              gap: 6,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <ChatCircleText size={14} color={colors.primary} weight="fill" />
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                Pregunta sugerida
              </Text>
            </View>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                lineHeight: 20,
              }}
            >
              "¿Cuántos días de ahorro cuesta eso?" — eso ancla el precio en
              esfuerzo real.
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomTabBar activeKey="monitorear" />
    </View>
  );
}
