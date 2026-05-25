import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  SpeakerHigh,
} from "phosphor-react-native";
import { MisionStepIndicator } from "@/components/MisionStepIndicator";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { SuccessToast } from "@/components/states";
import { api } from "@/api";
import { useMissionAttempts } from "@/store/missionAttempts";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

const CHECKLIST = [
  "Hacer una lista de lo que necesitamos",
  "Comparar precios de 3 productos",
  "Calcular el cambio correctamente",
];

export default function Activa() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [checked, setChecked] = useState<boolean[]>([true, false, false]);
  const [toast, setToast] = useState<string | null>(null);
  const attempt = useMissionAttempts((s) => s.getCount(id ?? "")) + 1;
  const recordAttempt = useMissionAttempts((s) => s.recordAttempt);

  useEffect(() => {
    api.getMissions().then((ms) => setMission(ms.find((m) => m.id === id) ?? null));
  }, [id]);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const completed = checked.filter(Boolean).length;
  const pct = Math.round((completed / CHECKLIST.length) * 100);
  const allDone = completed === CHECKLIST.length;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <MisionStepIndicator
        step={4}
        totalSteps={4}
        stepLabel="Misión"
        backLabel="Misión"
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
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          {mission?.title ?? "Actividad"}
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          Decora tu alcancía y conversa con tu hijo sobre sus sueños de ahorro.
        </Text>

        <Pressable
          onPress={() => setToast("Reproduciendo misión desde la alcancía")}
          accessibilityRole="button"
          accessibilityLabel="Escuchar misión desde la alcancía"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: colors.primarySoft,
            borderRadius: 11,
            borderWidth: 1,
            borderColor: "#BBDEFB",
            height: 48,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <SpeakerHigh size={18} color={colors.primary} weight="fill" />
          <Text
            style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}
          >
            🔊 Escuchar misión desde la alcancía
          </Text>
        </Pressable>

        <View style={{ gap: 12 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Pasos de la actividad
          </Text>
          {CHECKLIST.map((step, i) => {
            const done = checked[i];
            return (
              <Pressable
                key={i}
                onPress={() => toggle(i)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: done }}
                accessibilityLabel={step}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: done ? "#E8F5E9" : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: done ? "#C8E6C9" : colors.neutral200,
                  borderRadius: 11,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  opacity: pressed ? 0.88 : 1,
                })}
              >
                {done ? (
                  <CheckCircle size={22} color="#2E7D32" weight="fill" />
                ) : (
                  <Circle size={22} color={colors.placeholder} />
                )}
                <Text
                  style={{
                    flex: 1,
                    color: done ? "#2E7D32" : colors.textPrimary,
                    fontSize: 14,
                    fontWeight: done ? "600" : "500",
                    textDecorationLine: done ? "line-through" : "none",
                  }}
                >
                  {step}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              Progreso
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {completed} de {CHECKLIST.length}
            </Text>
          </View>
          <ProgressBar
            progress={pct}
            height={8}
            trackColor={colors.neutral200}
            fillColor={colors.primary}
            radius={4}
          />
        </View>

        <Pressable
          onPress={() => router.replace(`/ejecutar-mision/${id}/cuento` as never)}
          accessibilityRole="button"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: 10,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ArrowLeft size={14} color={colors.muted} />
          <Text style={{ color: colors.muted, fontSize: 13, fontWeight: "500" }}>
            Regresar al cuento
          </Text>
        </Pressable>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={allDone ? "Cumplió misión ✓" : `Falta ${CHECKLIST.length - completed}`}
          variant="primary"
          size="md"
          fullWidth
          disabled={!allDone}
          onPress={() => {
            recordAttempt(id ?? "", "mission");
            router.replace(`/ejecutar-mision/${id}/feedback-alcancia` as never);
          }}
        />
      </View>

      <SuccessToast
        visible={toast !== null}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </View>
  );
}
