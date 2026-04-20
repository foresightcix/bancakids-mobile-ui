import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Clock,
  Lightbulb,
  Play,
  Star,
  CheckCircle,
  ArrowsClockwise,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BottomSheet } from "@/components/BottomSheet";
import { SuccessToast } from "@/components/states";
import { api } from "@/api";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

export default function MisionDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [showEvaluacion, setShowEvaluacion] = useState(false);
  const [showRedo, setShowRedo] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    api.getMissions().then((all) => {
      const m = all.find((x) => x.id === id) ?? null;
      setMission(m);
    });
  }, [id]);

  if (!mission) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <AppHeader variant="secondary" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.muted }}>Cargando misión…</Text>
        </View>
      </View>
    );
  }

  const categoryColor =
    mission.category === "ahorrar"
      ? colors.primary
      : mission.category === "gastar_bien"
        ? "#2E7D32"
        : mission.category === "compartir"
          ? "#DB2777"
          : "#F59E0B";

  const steps = [
    { n: 1, title: "Guía del padre", desc: "Preguntas clave antes de empezar" },
    { n: 2, title: "Cuento interactivo", desc: "10 min con Sofi" },
    { n: 3, title: "Actividad guiada", desc: "Poner en práctica lo aprendido" },
    { n: 4, title: "Insight + Evaluación", desc: "Ver qué aprendió Sofi" },
  ].slice(0, mission.totalSteps);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 4,
            alignSelf: "flex-start",
            opacity: pressed ? 0.6 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <ArrowLeft size={20} color={colors.textHeading} weight="bold" />
          <Text
            style={{ color: colors.textPrimary, fontSize: 14, fontWeight: "600" }}
          >
            Volver
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 24,
            padding: 20,
            gap: 12,
          }}
        >
          <View
            style={{
              backgroundColor: categoryColor,
              borderRadius: 8,
              paddingVertical: 4,
              paddingHorizontal: 10,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700" }}>
              {mission.tagLabel}
            </Text>
          </View>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {mission.title}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "500",
              lineHeight: 20,
            }}
          >
            {mission.description}
          </Text>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Clock size={16} color={colors.muted} />
              <Text style={{ color: colors.muted, fontSize: 12 }}>
                {mission.estimatedMinutes} min
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Star size={16} color={colors.muted} weight="fill" />
              <Text style={{ color: colors.muted, fontSize: 12 }}>
                {mission.currentStep}/{mission.totalSteps} pasos
              </Text>
            </View>
          </View>
          {mission.status !== "locked" ? (
            <ProgressBar
              progress={mission.progress}
              height={8}
              trackColor="#FFFFFF"
              fillColor={categoryColor}
              radius={4}
            />
          ) : null}
        </View>

        {mission.insight ? (
          <Pressable
            onPress={() => setShowInsight(true)}
            style={({ pressed }) => ({
              backgroundColor: "#FEF3C7",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#FCD34D",
              padding: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              opacity: pressed ? 0.9 : 1,
            })}
            accessibilityRole="button"
          >
            <Lightbulb size={20} color="#B45309" weight="fill" />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#B45309",
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 0.4,
                }}
              >
                INSIGHT DISPONIBLE
              </Text>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 13,
                  fontWeight: "500",
                }}
                numberOfLines={1}
              >
                Toca para ver qué aprendió Sofi
              </Text>
            </View>
          </Pressable>
        ) : null}

        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Pasos de la misión
          </Text>
          {steps.map((s) => {
            const done = s.n <= mission.currentStep;
            const current = s.n === mission.currentStep + 1;
            return (
              <View
                key={s.n}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  borderRadius: 14,
                  borderWidth: current ? 1.5 : 1,
                  borderColor: current
                    ? categoryColor
                    : "#EEF2F7",
                  backgroundColor: done ? "#ECFDF3" : "#FFFFFF",
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: done
                      ? "#16A34A"
                      : current
                        ? categoryColor
                        : colors.neutral150,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {done ? (
                    <CheckCircle size={18} color="#FFFFFF" weight="fill" />
                  ) : (
                    <Text
                      style={{
                        color: current ? "#FFFFFF" : colors.muted,
                        fontSize: 14,
                        fontWeight: "700",
                      }}
                    >
                      {s.n}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.textPrimary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {s.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.muted,
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    {s.desc}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          gap: 10,
          backgroundColor: "#FFFFFF",
        }}
      >
        {mission.status === "locked" ? (
          <Button
            label="Misión bloqueada"
            variant="secondary"
            size="md"
            fullWidth
            disabled
          />
        ) : (
          <>
            <Button
              label={
                mission.currentStep === 0
                  ? "Iniciar misión"
                  : mission.currentStep >= mission.totalSteps
                    ? "Revisar misión"
                    : "Continuar misión"
              }
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Play size={16} color="#FFFFFF" weight="fill" />}
              onPress={() => {
                const path =
                  mission.currentStep === 0
                    ? `/ejecutar-mision/${mission.id}/guia-padre`
                    : mission.currentStep >= mission.totalSteps
                      ? `/ejecutar-mision/${mission.id}/redo`
                      : `/ejecutar-mision/${mission.id}/continuar`;
                router.push(path as never);
              }}
            />
            {mission.currentStep > 0 ? (
              <Button
                label="Reintentar desde el inicio"
                variant="ghost"
                size="sm"
                fullWidth
                leftIcon={
                  <ArrowsClockwise size={14} color={colors.textSecondary} />
                }
                onPress={() => setShowRedo(true)}
              />
            ) : null}
          </>
        )}
      </View>

      <BottomSheet
        visible={showInsight}
        onClose={() => setShowInsight(false)}
        title="Insight de Sofi"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 20,
          }}
        >
          {mission.insight}
        </Text>
        <Button
          label="Cerrar"
          variant="primary"
          size="md"
          fullWidth
          onPress={() => setShowInsight(false)}
        />
      </BottomSheet>

      <BottomSheet
        visible={showEvaluacion}
        onClose={() => setShowEvaluacion(false)}
        title="Evaluación del padre"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
          }}
        >
          ¿Cómo viste a Sofi en esta misión? Tu feedback nos ayuda a
          personalizar la próxima actividad.
        </Text>
        <View style={{ gap: 10, marginBottom: 20 }}>
          {["Excelente", "Muy bien", "Bien", "Con dificultad"].map((opt) => (
            <Pressable
              key={opt}
              onPress={() => {
                setShowEvaluacion(false);
                setToastMsg(`Feedback guardado: ${opt}`);
              }}
              style={({ pressed }) => ({
                borderRadius: 11,
                borderWidth: 1,
                borderColor: colors.neutral200,
                padding: 14,
                opacity: pressed ? 0.85 : 1,
              })}
              accessibilityRole="button"
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={showRedo}
        onClose={() => setShowRedo(false)}
        title="¿Reiniciar la misión?"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 20,
          }}
        >
          El progreso actual de Sofi en "{mission.title}" se perderá. Podrás
          comenzar de nuevo desde el primer paso.
        </Text>
        <View style={{ gap: 10 }}>
          <Button
            label="Mantener progreso"
            variant="secondary"
            size="md"
            fullWidth
            onPress={() => setShowRedo(false)}
          />
          <Button
            label="Reiniciar misión"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => {
              setShowRedo(false);
              setToastMsg("Misión reiniciada desde el paso 1");
            }}
          />
        </View>
      </BottomSheet>

      <SuccessToast
        visible={toastMsg !== null}
        message={toastMsg ?? ""}
        onClose={() => setToastMsg(null)}
      />
    </View>
  );
}
