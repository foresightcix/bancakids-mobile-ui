import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CheckCircle } from "phosphor-react-native";
import { PiggyWithCoins } from "@/components/PiggyWithCoins";
import { Button } from "@/components/ui/Button";
import { useCargarFlow } from "@/store/cargarFlow";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

export default function CelebracionScreen() {
  const router = useRouter();
  const { amount, destinoTipo, destinoMetaTitle, reset } = useCargarFlow();

  useEffect(() => () => reset(), [reset]);

  const destinoLine =
    destinoTipo === "meta" && destinoMetaTitle
      ? `Aporte sumado a la meta: ${destinoMetaTitle}`
      : "Disponible en la alcancía de Sofi";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#ECFDF3",
            borderRadius: 999,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <CheckCircle size={20} color="#166534" weight="fill" />
          <Text style={{ color: "#166534", fontSize: 14, fontWeight: "700" }}>
            Carga exitosa
          </Text>
        </View>

        <PiggyWithCoins />

        <View style={{ alignItems: "center", gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 44,
              fontWeight: "700",
            }}
          >
            {formatCurrency(amount ?? 0)}
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            ¡Carga realizada!
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "500",
              lineHeight: 20,
              textAlign: "center",
              maxWidth: 300,
            }}
          >
            ¡El dinero llegó!{"\n"}{destinoLine}
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Button
          label="Volver al inicio"
          variant="primary"
          size="md"
          fullWidth
          onPress={() => router.replace("/(tabs)" as never)}
        />
        <Button
          label="Hacer otra carga"
          variant="secondary"
          size="md"
          fullWidth
          onPress={() => {
            reset();
            router.replace("/flujo-cargar/monto" as never);
          }}
        />
      </View>
    </View>
  );
}
