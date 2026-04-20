import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CheckCircle } from "phosphor-react-native";
import { Button } from "@/components/ui/Button";
import { PiggyWithCoins } from "@/components/PiggyWithCoins";
import { useCelebrarFlow } from "@/store/celebrarFlow";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

/**
 * Success screen de Celebrar — 3 variantes según `modo` del store:
 *  - cargar:       "Carga exitosa"        + "S/.X"       + "¡Carga realizada!"
 *  - experiencia:  "Experiencia guardada" + nombre       + "La próxima vez..."
 *  - mensaje:      "Mensaje guardado"     + "¡Enviado!"  + "La próxima vez..."
 *
 * Reutiliza <PiggyWithCoins/> (280×220 piggy + 5 coins + 4 sparkles + confetti dots)
 */
export default function CelebrarExito() {
  const router = useRouter();
  const { modo, monto, experiencia, mensaje, reset } = useCelebrarFlow();

  useEffect(() => () => reset(), [reset]);

  const config = (() => {
    if (modo === "cargar") {
      return {
        badge: "Carga exitosa",
        headline: formatCurrency(monto ?? 0),
        headlineSize: 44,
        subtitle: "El dinero ya está en la alcancía de Sofi.\nMeta actual: Bicicleta nueva",
      };
    }
    if (modo === "experiencia") {
      return {
        badge: "Experiencia guardada",
        headline: experiencia || "Experiencia",
        headlineSize: 44,
        subtitle:
          "La próxima vez que prendas la alcancía, tu hijo recibirá una agradable sorpresa con la experiencia generada.",
      };
    }
    return {
      badge: "Mensaje guardado",
      headline: "¡Enviado!",
      headlineSize: 36,
      subtitle:
        mensaje
          ? `"${mensaje.slice(0, 80)}${mensaje.length > 80 ? "..." : ""}"`
          : "La próxima vez que prendas la alcancía, tu hijo recibirá una agradable sorpresa con tu mensaje.",
    };
  })();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
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
            {config.badge}
          </Text>
        </View>

        <PiggyWithCoins />

        <View style={{ alignItems: "center", gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: config.headlineSize,
              fontWeight: "700",
              textAlign: "center",
              maxWidth: 320,
            }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {config.headline}
          </Text>
          {modo === "cargar" ? (
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              ¡Carga realizada!
            </Text>
          ) : null}
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
            {config.subtitle}
          </Text>
        </View>
      </View>

      <Button
        label="Volver al inicio"
        variant="primary"
        size="md"
        fullWidth
        onPress={() => router.replace("/(tabs)" as never)}
      />
    </View>
  );
}
