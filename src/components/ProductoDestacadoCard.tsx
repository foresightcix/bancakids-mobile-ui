import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { NotePencil } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

/**
 * "Producto Destacado Card" (`WpYo0`) — Consejo del día.
 * Bg #F7D1E8, radius 28, padding 24, gap 18.
 */
export function ProductoDestacadoCard() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/ensenar")}
      accessibilityRole="button"
      accessibilityLabel="Consejo del día: Deseo versus necesidad"
      style={({ pressed }) => ({
        backgroundColor: colors.missionPink,
        borderRadius: 28,
        padding: 24,
        opacity: pressed ? 0.92 : 1,
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <View style={{ flex: 1, gap: 8 }}>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 0.6,
            }}
          >
            CONSEJO DEL DÍA
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Deseo versus necesidad
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: "500",
              lineHeight: 17,
            }}
          >
            Recomendaciones de preguntas, cuentos y actividades.
          </Text>
        </View>
        <View
          style={{
            width: 78,
            height: 78,
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NotePencil size={30} color="#3E3E3E" weight="regular" />
        </View>
      </View>
    </Pressable>
  );
}
