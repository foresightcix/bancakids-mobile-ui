import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FlagBanner,
  GitMerge,
  Sparkle,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { api } from "@/api";
import { useMissionAttempts } from "@/store/missionAttempts";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

export default function Redo() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const currentCount = useMissionAttempts((s) => s.getCount(id ?? ""));
  const nextAttempt = currentCount + 1;

  useEffect(() => {
    api
      .getMissions()
      .then((ms) => setMission(ms.find((m) => m.id === id) ?? null));
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <View style={{ gap: 4 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Progreso de la misión
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
            }}
          >
            {mission?.title ?? "Misión"} · Próximo intento #{nextAttempt}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 11,
            paddingVertical: 10,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <GitMerge size={16} color={colors.primary} />
          <Text
            style={{
              flex: 1,
              color: colors.primary,
              fontSize: 12,
              fontWeight: "500",
              lineHeight: 17,
            }}
          >
            Los insights son acumulativos: cada intento profundiza el
            aprendizaje anterior.
          </Text>
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          Insight anterior · 15 Abr 2026
        </Text>

        {/* Insight Card 1 */}
        <View
          style={{
            backgroundColor: "#F9FAFB",
            borderWidth: 1,
            borderColor: colors.neutral200,
            borderRadius: 14,
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              backgroundColor: colors.primarySoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={20} color={colors.primary} weight="fill" />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Insight de aprendizaje
            </Text>
            <Text
              style={{
                color: colors.placeholder,
                fontSize: 12,
              }}
            >
              Ahorro · 10:30 AM · 15 Abr
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#E8F5E9",
              borderRadius: 100,
              paddingVertical: 4,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{ color: "#2E7D32", fontSize: 10, fontWeight: "600" }}
            >
              Indicador cumplido
            </Text>
          </View>
        </View>

        {/* Insight Text */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: colors.neutral200,
            borderRadius: 14,
            padding: 16,
            gap: 8,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Resumen del insight
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 20,
            }}
          >
            Sofi demostró entender el concepto de ahorro al decorar su alcancía
            con metas visuales. Identificó correctamente que ahorrar sirve para
            cumplir sueños a futuro.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 4,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#2E7D32",
              }}
            />
            <Text
              style={{
                color: "#2E7D32",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Indicador: Reconoce el valor del ahorro
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() =>
            router.push(
              `/insights?competencia=${encodeURIComponent(
                mission?.title ?? "",
              )}` as never,
            )
          }
          accessibilityRole="button"
          accessibilityLabel="Ver historial completo de insights"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: 10,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Ver historial completo de esta competencia
          </Text>
          <ArrowRight size={14} color={colors.primary} weight="bold" />
        </Pressable>

        {/* Redo section */}
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 16,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          ¿Qué deseas hacer ahora?
        </Text>

        <RedoButton
          Icon={BookOpen}
          iconColor={colors.primary}
          bg={colors.primarySoft}
          title="Ir al cuento"
          subtitle="Refuerza conceptos antes de reintentar"
          onPress={() =>
            router.replace(`/ejecutar-mision/${id}/cuento` as never)
          }
        />
        <RedoButton
          Icon={FlagBanner}
          iconColor="#2E7D32"
          bg="#E8F5E9"
          title="Ir a la misión"
          subtitle="Cuenta como nuevo intento · Feedback completo"
          onPress={() =>
            router.replace(`/ejecutar-mision/${id}/activa` as never)
          }
        />
        <RedoButton
          Icon={Sparkle}
          iconColor={colors.accent}
          bg="#FFF3E0"
          title="Crear escenarios de práctica"
          subtitle="Cada escenario cuenta como intento · Insight automático"
          onPress={() =>
            router.replace(`/ejecutar-mision/${id}/practica` as never)
          }
        />
      </ScrollView>
    </View>
  );
}

function RedoButton({
  Icon,
  iconColor,
  bg,
  title,
  subtitle,
  onPress,
}: {
  Icon: typeof BookOpen;
  iconColor: string;
  bg: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => ({
        backgroundColor: bg,
        borderRadius: 14,
        height: 60,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        opacity: pressed ? 0.88 : 1,
      })}
    >
      <Icon size={24} color={iconColor} weight="fill" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
          }}
        >
          {subtitle}
        </Text>
      </View>
      <ArrowRight size={18} color={iconColor} weight="bold" />
    </Pressable>
  );
}
