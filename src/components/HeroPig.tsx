import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { PiggyIllustration } from "./PiggyIllustration";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

interface Props {
  balance: number;
}

/**
 * Hero Pig card — replica exacta del frame `ZukJ6` del Home del .pen.
 * Bg #E1EEFB, radius 28, padding [22, 20], altura 176.
 */
export function HeroPig({ balance }: Props) {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: colors.primarySoft,
        borderRadius: 28,
        paddingVertical: 22,
        paddingHorizontal: 20,
        minHeight: 176,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          gap: 12,
          justifyContent: "center",
          width: 152,
        }}
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 11,
            fontWeight: "700",
            lineHeight: 13.2,
            letterSpacing: 0.5,
          }}
        >
          DINERO AHORRADO
        </Text>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 30,
            fontWeight: "700",
            lineHeight: 36,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(balance)}
        </Text>
        <Pressable
          onPress={() => router.push("/flujo-cargar/monto" as never)}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            height: 44,
            width: 146,
            borderRadius: 11,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.85 : 1,
          })}
          accessibilityRole="button"
          accessibilityLabel="Cargar dinero"
        >
          <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>
            Cargar dinero
          </Text>
        </Pressable>
      </View>
      <PiggyIllustration size={158} />
    </View>
  );
}
