import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRight,
  BookOpenText,
  Coin,
  Target,
} from "phosphor-react-native";
import { MisionStepIndicator } from "@/components/MisionStepIndicator";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/states";
import { api } from "@/api";
import { useMissionAttempts } from "@/store/missionAttempts";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

const LEVELS: {
  key: "verde" | "ambar" | "rojo";
  label: string;
  desc: string;
  bg: string;
  color: string;
  dot: string;
}[] = [
  {
    key: "verde",
    label: "Verde",
    desc: "El niño identifica al menos 3 razones para ahorrar y propone una meta propia sin ayuda.",
    bg: "#E8F5E9",
    color: "#2E7D32",
    dot: "#2E7D32",
  },
  {
    key: "ambar",
    label: "Ámbar",
    desc: "El niño reconoce la importancia de ahorrar pero necesita guía para definir una meta concreta.",
    bg: "#FFF3E0",
    color: "#92400E",
    dot: "#F59E0B",
  },
  {
    key: "rojo",
    label: "Rojo",
    desc: "El niño no muestra interés o no comprende por qué guardar dinero es importante.",
    bg: "#FEE2E2",
    color: "#991B1B",
    dot: "#EF4444",
  },
];

export default function GuiaPadre() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const attempt = useMissionAttempts((s) => s.getCount(id ?? "")) + 1;

  useEffect(() => {
    api.getMissions().then((ms) => setMission(ms.find((m) => m.id === id) ?? null));
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <MisionStepIndicator
        step={1}
        totalSteps={4}
        stepLabel="Guía para el padre"
        backLabel="Guía del padre"
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
        {!mission ? (
          <LoadingSkeleton rows={3} />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.primarySoft,
                borderRadius: 14,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Coin size={48} color={colors.primary} weight="fill" />
            </View>

            <View style={{ gap: 8 }}>
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
                  lineHeight: 20,
                }}
              >
                En esta actividad tu hijo aprenderá sobre el valor de ahorrar
                de forma divertida, usando una alcancía que podrá
                personalizar.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.primarySoft,
                borderRadius: 18,
                padding: 16,
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <BookOpenText size={20} color={colors.primary} weight="fill" />
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  Competencia que se trabaja
                </Text>
              </View>
              <Text
                style={{
                  color: colors.textHeading,
                  fontSize: 13,
                  lineHeight: 20,
                }}
              >
                Ahorro: Entender que guardar dinero permite alcanzar metas y
                cumplir deseos a futuro.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 11,
                padding: 14,
                borderWidth: 1,
                borderColor: colors.neutral200,
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Target size={18} color={colors.accent} weight="fill" />
                <Text
                  style={{
                    color: colors.accent,
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  Indicador de aprendizaje
                </Text>
              </View>
              <Text
                style={{
                  color: colors.textHeading,
                  fontSize: 13,
                  lineHeight: 20,
                }}
              >
                Al finalizar, el niño podrá identificar al menos una meta
                personal por la que vale la pena ahorrar.
              </Text>
            </View>

            <View style={{ gap: 10 }}>
              <Text
                style={{
                  color: colors.textHeading,
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Niveles del indicador (6 años)
              </Text>
              {LEVELS.map((lv) => (
                <View
                  key={lv.key}
                  style={{
                    backgroundColor: lv.bg,
                    borderRadius: 11,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: lv.dot,
                      marginTop: 3,
                    }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      color: lv.color,
                      fontSize: 12,
                      fontWeight: "500",
                      lineHeight: 17,
                    }}
                  >
                    <Text style={{ fontWeight: "700" }}>{lv.label}:</Text>{" "}
                    {lv.desc}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label="Continuar al cuento"
          variant="primary"
          size="md"
          fullWidth
          rightIcon={<ArrowRight size={18} color="#FFFFFF" weight="bold" />}
          onPress={() =>
            router.push(`/ejecutar-mision/${id}/cuento` as never)
          }
        />
      </View>
    </View>
  );
}
