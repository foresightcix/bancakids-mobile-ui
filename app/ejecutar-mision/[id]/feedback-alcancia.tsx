import { useEffect, useRef, useState } from "react";
import { Animated, Easing, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Info,
  Lightbulb,
  Microphone,
  Sparkle,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/tokens";

export default function FeedbackAlcancia() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activating, setActivating] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const onActivate = async () => {
    setActivating(true);
    await new Promise((r) => setTimeout(r, 1500));
    setActivating(false);
    router.replace(`/ejecutar-mision/${id}/feedback-padre` as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="home" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 24,
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Piggy area with floating elements */}
        <View style={{ width: 200, height: 180, alignItems: "center", justifyContent: "center" }}>
          <View style={{ position: "absolute", top: 15, left: 5 }}>
            <Sparkle size={18} color="#FBBF24" weight="fill" />
          </View>
          <View style={{ position: "absolute", bottom: 15, left: 10 }}>
            <Sparkle size={14} color={colors.accent} weight="fill" />
          </View>
          <Animated.View style={{ transform: [{ scale: pulse }] }}>
            <PiggyIllustration size={140} />
          </Animated.View>
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: colors.primary,
              shadowOpacity: 0.4,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Microphone size={28} color="#FFFFFF" weight="fill" />
          </View>
        </View>

        {/* Text area */}
        <View style={{ alignItems: "center", gap: 12 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 28,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Es turno de tu hijo
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 15,
              fontWeight: "500",
              lineHeight: 22,
              textAlign: "center",
              maxWidth: 320,
            }}
          >
            La alcancía le preguntará a tu hijo cómo le fue en la misión. Solo
            necesita hablarle directamente a la alcancía.
          </Text>
        </View>

        {/* Info card azul */}
        <View
          style={{
            width: "100%",
            backgroundColor: colors.primarySoft,
            borderRadius: 14,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Info size={24} color={colors.primary} weight="fill" />
          <Text
            style={{
              flex: 1,
              color: colors.primary,
              fontSize: 13,
              fontWeight: "500",
              lineHeight: 18,
            }}
          >
            La alcancía grabará la reflexión de tu hijo y la procesará
            automáticamente.
          </Text>
        </View>

        {/* Tip card naranja */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFF3E0",
            borderRadius: 14,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Lightbulb size={24} color={colors.accent} weight="fill" />
          <Text
            style={{
              flex: 1,
              color: "#92400E",
              fontSize: 13,
              fontWeight: "500",
              lineHeight: 18,
            }}
          >
            Dale espacio a tu hijo para que se exprese libremente. No
            intervengas ni corrijas sus respuestas.
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={activating ? "Escuchando a tu hijo…" : "Activar alcancía"}
          variant="primary"
          size="md"
          fullWidth
          loading={activating}
          onPress={onActivate}
        />
      </View>
    </View>
  );
}
