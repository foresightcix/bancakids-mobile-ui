import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Confetti, ArrowRight } from "phosphor-react-native";
import { gradients } from "@/theme/tokens";

/**
 * Botón CTA "¡Celebrar logro!" del Home (`j7Ern` en el .pen).
 * Gradient naranja horizontal, altura 60, radius 28, shadow cálida.
 */
export function CelebrateButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/celebrar/motivo" as never)}
      accessibilityRole="button"
      accessibilityLabel="Celebrar logro"
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
      })}
    >
      <LinearGradient
        colors={gradients.celebrate.colors}
        start={gradients.celebrate.start}
        end={gradients.celebrate.end}
        style={{
          height: 60,
          borderRadius: 28,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          shadowColor: "#E87C31",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 16,
          elevation: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Confetti size={28} color="#FFFFFF" weight="fill" />
          <View style={{ gap: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}>
              ¡Celebrar logro!
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                opacity: 0.85,
                fontSize: 11,
                fontWeight: "500",
              }}
            >
              Sorprende a Sofi
            </Text>
          </View>
        </View>
        <ArrowRight size={22} color="#FFFFFF" weight="bold" />
      </LinearGradient>
    </Pressable>
  );
}
