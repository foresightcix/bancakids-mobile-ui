import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, Info, X } from "phosphor-react-native";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/tokens";

type Answer = "si" | "a_veces" | "no";

const QUESTIONS: { id: string; label: string }[] = [
  { id: "q1", label: "1. ¿Tu hijo pudo identificar razones para ahorrar?" },
  { id: "q2", label: "2. ¿Propuso una meta de ahorro propia?" },
  { id: "q3", label: "3. ¿Mostró interés en seguir practicando?" },
];

const OPTIONS: { key: Answer; label: string; colorBg: string; colorFg: string; colorBorder: string }[] = [
  { key: "si", label: "Sí", colorBg: "#E8F5E9", colorFg: "#2E7D32", colorBorder: "#2E7D32" },
  { key: "a_veces", label: "A veces", colorBg: "#FFF3E0", colorFg: "#92400E", colorBorder: "#F59E0B" },
  { key: "no", label: "No", colorBg: "#FEE2E2", colorFg: "#991B1B", colorBorder: "#DC2626" },
];

export default function EvaluacionPadre() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [answers, setAnswers] = useState<Record<string, Answer | null>>({
    q1: null,
    q2: null,
    q3: null,
  });
  const [loading, setLoading] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== null);

  const onGenerate = async () => {
    if (!allAnswered) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push(`/ejecutar-mision/${id}/insight` as never);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#00000066",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          padding: 24,
          gap: 20,
          maxHeight: "95%",
        }}
      >
        {/* Modal Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Evaluación del padre
          </Text>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Cerrar"
            style={({ pressed }) => ({
              width: 32,
              height: 32,
              borderRadius: 14,
              backgroundColor: colors.neutral100,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <X size={16} color={colors.muted} weight="bold" />
          </Pressable>
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          Responde estas preguntas según lo que observaste durante la misión.
        </Text>

        <View style={{ height: 1, backgroundColor: colors.neutral100 }} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14 }}
        >
          {/* Indicador card */}
          <View
            style={{
              backgroundColor: "#F9FAFB",
              borderWidth: 1,
              borderColor: colors.neutral200,
              borderRadius: 11,
              padding: 12,
              gap: 6,
            }}
          >
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              Indicador de aprendizaje
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                lineHeight: 17,
              }}
            >
              El niño reconoce la diferencia entre necesidades y deseos al
              momento de tomar decisiones de gasto.
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
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#F59E0B",
                }}
              />
              <Text
                style={{
                  color: "#92400E",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                En desarrollo
              </Text>
            </View>
          </View>

          {/* Questions */}
          {QUESTIONS.map((q) => {
            const selected = answers[q.id];
            return (
              <View key={q.id} style={{ gap: 8 }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 13,
                    fontWeight: "700",
                    lineHeight: 17,
                  }}
                >
                  {q.label}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {OPTIONS.map((opt) => {
                    const isActive = selected === opt.key;
                    return (
                      <Pressable
                        key={opt.key}
                        onPress={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: opt.key }))
                        }
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isActive }}
                        accessibilityLabel={`${q.label} — ${opt.label}`}
                        style={({ pressed }) => ({
                          flex: 1,
                          height: 36,
                          borderRadius: 8,
                          backgroundColor: isActive
                            ? opt.colorBg
                            : colors.neutral100,
                          borderWidth: isActive ? 1.5 : 0,
                          borderColor: isActive ? opt.colorBorder : "transparent",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: pressed ? 0.85 : 1,
                        })}
                      >
                        <Text
                          style={{
                            color: isActive ? opt.colorFg : colors.textSecondary,
                            fontSize: 12,
                            fontWeight: isActive ? "700" : "500",
                          }}
                        >
                          {opt.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}

          {/* Help row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <Info size={14} color={colors.muted} weight="fill" />
            <Text
              style={{
                flex: 1,
                color: colors.textSecondary,
                fontSize: 12,
                lineHeight: 17,
              }}
            >
              Tus respuestas se cruzarán con lo que tu hijo le contó a la
              alcancía para generar un insight de aprendizaje personalizado.
            </Text>
          </View>
        </ScrollView>

        {/* Buttons */}
        <View style={{ gap: 10 }}>
          <Pressable
            onPress={onGenerate}
            disabled={!allAnswered || loading}
            accessibilityRole="button"
            accessibilityLabel="Generar insight"
            accessibilityState={{ disabled: !allAnswered || loading }}
            style={({ pressed }) => ({
              height: 48,
              borderRadius: 11,
              backgroundColor: allAnswered ? "#2E7D32" : colors.neutral200,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: allAnswered ? "#FFFFFF" : colors.muted,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {loading ? "Generando insight..." : "Generar insight"}
            </Text>
            {allAnswered && !loading ? (
              <CheckCircle size={18} color="#FFFFFF" weight="fill" />
            ) : null}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
