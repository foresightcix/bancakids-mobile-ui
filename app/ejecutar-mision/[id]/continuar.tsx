import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  ClockCounterClockwise,
  FlagBanner,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/BottomSheet";
import { api } from "@/api";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";
import { BottomTabBar } from "@/components/BottomTabBar";

const MISSION_STEPS = [
  { title: "Guía del padre", done: true },
  { title: "Cuento interactivo", done: true },
  { title: "Actividad guiada", done: false, current: true },
  { title: "Insight + Evaluación", done: false },
];

export default function ContinuarMision() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    api
      .getMissions()
      .then((ms) => setMission(ms.find((m) => m.id === id) ?? null));
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="home" />
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <Pressable
          onPress={() => router.replace("/ensenar" as never)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Volver a Misiones"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 4,
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
            Misiones
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 24,
          gap: 20,
        }}
      >
        {/* Resume banner */}
        <LinearGradient
          colors={["#E1EEFB", "#FFF3E0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 14,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ClockCounterClockwise
            size={32}
            color={colors.primary}
            weight="fill"
          />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              Tienes una misión en curso
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              Continúa donde te quedaste
            </Text>
          </View>
        </LinearGradient>

        {/* Mission card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: colors.neutral200,
            borderRadius: 14,
            padding: 16,
            gap: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.primarySoft,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlagBanner size={22} color={colors.primary} weight="fill" />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Misión en progreso
              </Text>
              <Text style={{ color: colors.placeholder, fontSize: 12 }}>
                Iniciada el 15 Abr 2026
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {mission?.title ?? "La alcancía mágica"}
          </Text>

          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#2E7D32",
              }}
            />
            <Text
              style={{ color: colors.textSecondary, fontSize: 12, fontWeight: "500" }}
            >
              Ahorrar · Casa · 15 min
            </Text>
          </View>

          <View style={{ gap: 10, marginTop: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Tu progreso
            </Text>
            {MISSION_STEPS.map((step, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {step.done ? (
                  <CheckCircle size={22} color="#2E7D32" weight="fill" />
                ) : step.current ? (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: colors.primary,
                      backgroundColor: colors.primarySoft,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </View>
                ) : (
                  <Circle size={22} color={colors.placeholder} />
                )}
                <Text
                  style={{
                    flex: 1,
                    color: step.done
                      ? "#2E7D32"
                      : step.current
                        ? colors.primary
                        : colors.textSecondary,
                    fontSize: 13,
                    fontWeight: step.current ? "700" : step.done ? "600" : "500",
                    textDecorationLine: step.done ? "line-through" : "none",
                  }}
                >
                  {step.title}
                </Text>
                {step.current ? (
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    Aquí estás
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12, gap: 10 }}>
        <Pressable
          onPress={() => router.replace(`/ejecutar-mision/${id}/activa` as never)}
          accessibilityRole="button"
          accessibilityLabel="Continuar donde me quedé"
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            borderRadius: 11,
            height: 52,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: pressed ? 0.88 : 1,
          })}
        >
          <Text
            style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}
          >
            Continuar donde me quedé
          </Text>
          <ArrowRight size={18} color="#FFFFFF" weight="bold" />
        </Pressable>
        <Button
          label="Empezar desde el inicio"
          variant="secondary"
          size="md"
          fullWidth
          onPress={() => setShowRestart(true)}
        />
      </View>

      <BottomSheet
        visible={showRestart}
        onClose={() => setShowRestart(false)}
        title="¿Empezar desde el inicio?"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 20,
          }}
        >
          Perderás el progreso actual de esta misión. Podrás volver a la Guía
          del padre y empezar de nuevo.
        </Text>
        <View style={{ gap: 10 }}>
          <Button
            label="Cancelar"
            variant="secondary"
            size="md"
            fullWidth
            onPress={() => setShowRestart(false)}
          />
          <Button
            label="Sí, empezar desde el inicio"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => {
              setShowRestart(false);
              router.replace(`/ejecutar-mision/${id}/guia-padre` as never);
            }}
          />
        </View>
      </BottomSheet>
      <BottomTabBar activeKey="ensenar" />
    </View>
  );
}
