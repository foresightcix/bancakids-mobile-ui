import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Bank, BookOpen, WifiHigh, type IconProps } from "phosphor-react-native";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { Button } from "@/components/ui/Button";
import { useSession } from "@/store/session";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { setHasCompletedOnboarding } from "@/hooks/useOnboardingStatus";
import { colors } from "@/theme/tokens";

const CARDS: {
  Icon: React.ComponentType<IconProps>;
  title: string;
  sub: string;
}[] = [
  {
    Icon: WifiHigh,
    title: "Chanchito está online",
    sub: "Conectada al WiFi y sincronizada",
  },
  {
    Icon: Bank,
    title: "Yape vinculado",
    sub: "La mesada se puede configurar desde Configuración",
  },
  {
    Icon: BookOpen,
    title: "Ruta de aprendizaje lista",
    sub: "3 temas seleccionados para Sofi según su edad",
  },
];

export default function CelebracionFinal() {
  const router = useRouter();
  const completeOnboarding = useSession((s) => s.completeOnboarding);
  const resetOnboarding = useOnboardingFlow((s) => s.reset);
  const [finishing, setFinishing] = useState(false);

  const onFinish = async () => {
    if (finishing) return;
    setFinishing(true);
    // Persiste el flag ANTES de redirigir — si la app se cierra entre medio,
    // la próxima vez salta directo al Home.
    await setHasCompletedOnboarding(true);
    completeOnboarding();
    resetOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 30,
          paddingBottom: 20,
          alignItems: "center",
          gap: 16,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.primarySoft,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <PiggyIllustration size={100} />
        </View>

        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 14,
            paddingVertical: 6,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{ color: colors.primary, fontSize: 14, fontWeight: "700" }}
          >
            ¡Hola, soy Chanchito!
          </Text>
        </View>

        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 26,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          ¡Todo listo, Sofi!
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            textAlign: "center",
          }}
        >
          La alcancía de Sofi está conectada, configurada y con nombre propio.
          Ya pueden empezar.
        </Text>

        {/* Status cards */}
        <View style={{ width: "100%", gap: 8 }}>
          {CARDS.map(({ Icon, title, sub }) => (
            <View
              key={title}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: colors.neutral100,
                borderRadius: 11,
                paddingVertical: 12,
                paddingHorizontal: 14,
              }}
            >
              <Icon size={20} color={colors.primary} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 11,
                    marginTop: 1,
                  }}
                >
                  {sub}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Momento card */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderWidth: 1.5,
            borderColor: colors.primarySoft,
            borderRadius: 14,
            paddingVertical: 14,
            paddingHorizontal: 16,
            gap: 6,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            El primer momento ahora mismo
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            Pregúntale a Sofi: "¿Qué es lo primero que quieres guardar en
            Chanchito?" Esa conversación es el comienzo de todo.
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={finishing ? "Guardando..." : "🐷  Ir a la alcancía"}
          variant="primary"
          size="lg"
          fullWidth
          loading={finishing}
          onPress={onFinish}
        />
      </View>
    </View>
  );
}
