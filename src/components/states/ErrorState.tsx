import { Pressable, Text, View } from "react-native";
import { ArrowClockwise, WifiSlash } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

interface Props {
  title?: string;
  description?: string;
  onRetry: () => void;
  retrying?: boolean;
}

/**
 * Error de Red (8bmIm del .pen) — card blanca radius 18 padding 32.
 * Icon circle 80×80 #FEE2E2 con wifi-slash #EF4444 + title + desc + CTA.
 */
export function ErrorState({
  title = "Sin conexión",
  description = "No pudimos cargar la información.\nRevisa tu conexión e intenta de nuevo.",
  onRetry,
  retrying = false,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#FEE2E2",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WifiSlash size={36} color="#EF4444" weight="fill" />
      </View>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 20,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          lineHeight: 21,
          textAlign: "center",
          maxWidth: 280,
        }}
      >
        {description}
      </Text>
      <Pressable
        onPress={onRetry}
        disabled={retrying}
        accessibilityRole="button"
        accessibilityLabel="Reintentar carga"
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: colors.primary,
          borderRadius: 11,
          paddingVertical: 12,
          paddingHorizontal: 24,
          opacity: retrying ? 0.7 : pressed ? 0.85 : 1,
        })}
      >
        <ArrowClockwise size={18} color="#FFFFFF" weight="bold" />
        <Text
          style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}
        >
          {retrying ? "Reintentando..." : "Reintentar"}
        </Text>
      </Pressable>
    </View>
  );
}
