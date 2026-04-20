import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { AppHeader } from "./AppHeader";
import { colors } from "@/theme/tokens";

interface Props {
  step: number;
  totalSteps: number;
  stepLabel: string;
  backLabel?: string;
  onBack?: () => void;
  /** Si se pasa > 1, muestra pill "Intento #X" a la derecha */
  attempt?: number;
}

/**
 * Header reutilizable del flujo Ejecutar Misión:
 * AppHeader + Back row + (opcional) Intento badge + "Paso X de Y · Label"
 */
export function MisionStepIndicator({
  step,
  totalSteps,
  stepLabel,
  backLabel = "Misión",
  onBack,
  attempt,
}: Props) {
  const router = useRouter();
  const showAttempt = attempt !== undefined && attempt > 1;

  return (
    <>
      <AppHeader variant="secondary" />
      <View style={{ paddingHorizontal: 20, paddingTop: 8, gap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => (onBack ? onBack() : router.back())}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Regresar"
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              opacity: pressed ? 0.6 : 1,
              paddingVertical: 4,
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
              {backLabel}
            </Text>
          </Pressable>
          {showAttempt ? (
            <View
              style={{
                backgroundColor: "#FFF3E0",
                borderRadius: 100,
                paddingVertical: 4,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{ color: "#92400E", fontSize: 12, fontWeight: "700" }}
              >
                Intento #{attempt}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingVertical: 3,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700" }}
            >
              Paso {step}
            </Text>
          </View>
          <Text
            style={{ color: colors.muted, fontSize: 12, fontWeight: "500" }}
          >
            de {totalSteps} · {stepLabel}
          </Text>
        </View>
      </View>
    </>
  );
}
