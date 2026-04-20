import { Text, View } from "react-native";
import { colors } from "@/theme/tokens";

interface Props {
  /** 1-based step */
  step: number;
  /** Total de pasos (el .pen usa 10) */
  total?: number;
  /** Label contextual — ej. "Medio de pago", "La alcancía física" */
  section: string;
}

/**
 * Progress header común a todas las pantallas de onboarding (3b, 3c, 7, 8, 8b, 9).
 * Barra de `total` segmentos de 4h, primeros `step` llenos azul, resto #f3f4f6,
 * + label "{section} · X de Y"
 */
export function OnboardingProgress({ step, total = 10, section }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 20,
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i < step ? colors.primary : colors.neutral100,
            }}
          />
        ))}
      </View>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        {section} · {step} de {total}
      </Text>
    </View>
  );
}
