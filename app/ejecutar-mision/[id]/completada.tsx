import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  CheckCircle,
  Confetti,
  Info,
  Star,
  Trophy,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/tokens";

export default function MisionCompletada() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 24,
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Badge "Intento 1 completado" */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#E8F5E9",
            borderRadius: 100,
            paddingVertical: 6,
            paddingHorizontal: 14,
          }}
        >
          <CheckCircle size={16} color="#2E7D32" weight="fill" />
          <Text
            style={{ color: "#2E7D32", fontSize: 13, fontWeight: "600" }}
          >
            Intento 1 completado
          </Text>
        </View>

        {/* Confetti area con iconos absolutos */}
        <View style={{ width: 200, height: 200 }}>
          <View style={{ position: "absolute", left: 80, top: 10 }}>
            <Star size={40} color={colors.accent} weight="fill" />
          </View>
          <View style={{ position: "absolute", left: 30, top: 40 }}>
            <Star size={24} color={colors.primary} weight="fill" />
          </View>
          <View style={{ position: "absolute", left: 150, top: 30 }}>
            <Star size={24} color={colors.primary} weight="fill" />
          </View>
          <View style={{ position: "absolute", left: 60, top: 60 }}>
            <Confetti size={80} color={colors.accent} weight="fill" />
          </View>
          <View style={{ position: "absolute", left: 68, top: 110 }}>
            <Trophy size={64} color={colors.primary} weight="fill" />
          </View>
        </View>

        {/* Message */}
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 28,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            ¡Misión completada!
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            ¡Gran trabajo en el primer paso!
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 21,
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            Has completado el primer intento de esta misión. Ahora
            reflexionaremos juntos sobre lo aprendido.
          </Text>
        </View>

        {/* CTAs */}
        <View style={{ width: "100%", gap: 12 }}>
          <Button
            label="Continuar a reflexión →"
            variant="primary"
            size="md"
            fullWidth
            onPress={() =>
              router.push(`/ejecutar-mision/${id}/redo` as never)
            }
          />
          <Button
            label="Escoger otra misión"
            variant="secondary"
            size="md"
            fullWidth
            onPress={() => router.replace("/ensenar" as never)}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: colors.neutral150,
              borderRadius: 11,
              padding: 14,
              paddingHorizontal: 14,
              alignItems: "flex-start",
            }}
          >
            <Info size={16} color={colors.muted} weight="fill" />
            <Text
              style={{
                flex: 1,
                color: colors.muted,
                fontSize: 12,
                lineHeight: 17,
              }}
            >
              En intentos posteriores, irás al Progreso de la misión donde
              elegirás tu próximo paso.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
