import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { QrCode } from "phosphor-react-native";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { Button } from "@/components/ui/Button";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { colors } from "@/theme/tokens";

const STEPS = [
  "Enciende la alcancía",
  "Presiona el botón hasta que parpadee verde",
  "Apunta la cámara hacia la pantallita",
];

export default function Pairing() {
  const router = useRouter();
  const setMethod = useOnboardingFlow((s) => s.setPairingMethod);
  const [status, setStatus] = useState<"searching" | "found">("searching");
  const scanY = useRef(new Animated.Value(40)).current;
  const statusDot = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Scan line loop
    const scanLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanY, {
          toValue: 180,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanY, {
          toValue: 40,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    // Status dot pulse
    const dotLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(statusDot, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(statusDot, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    scanLoop.start();
    dotLoop.start();

    // Simulate detection after 3s
    const timer = setTimeout(() => setStatus("found"), 3000);

    return () => {
      scanLoop.stop();
      dotLoop.stop();
      clearTimeout(timer);
    };
  }, [scanY, statusDot]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <OnboardingProgress step={8} section="La alcancía física" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 20,
          alignItems: "center",
          gap: 14,
        }}
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          Escanea tu alcancía
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            textAlign: "center",
          }}
        >
          Enciende la alcancía y presiona el botón trasero hasta que parpadee
          verde.
        </Text>

        {/* Steps card */}
        <View
          style={{
            width: "100%",
            backgroundColor: colors.neutral100,
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            gap: 10,
          }}
        >
          {STEPS.map((step, i) => (
            <View
              key={i}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 11,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 13,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Viewfinder */}
        <View
          style={{
            width: "100%",
            height: 220,
            borderRadius: 14,
            backgroundColor: colors.primarySoft,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 11,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCode size={60} color={colors.primary} weight="regular" />
          </View>
          <Animated.View
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              height: 3,
              backgroundColor: colors.primary,
              opacity: 0.6,
              borderRadius: 2,
              transform: [{ translateY: scanY }],
            }}
          />
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 11,
            textAlign: "center",
          }}
        >
          Mantén la alcancía a 20–30 cm · Buena iluminación ayuda
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Animated.View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: status === "found" ? "#16A34A" : colors.accent,
              opacity: status === "found" ? 1 : statusDot,
            }}
          />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {status === "found"
              ? "¡Alcancía detectada!"
              : "Buscando el código QR..."}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/(onboarding)/codigo-manual" as never)}
          hitSlop={8}
          accessibilityRole="link"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Ingresar código manualmente
          </Text>
        </Pressable>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={
            status === "found"
              ? "Alcancía detectada — continuar"
              : "Esperando QR..."
          }
          variant="primary"
          size="lg"
          fullWidth
          disabled={status !== "found"}
          onPress={() => {
            setMethod("qr");
            router.push("/(onboarding)/wifi" as never);
          }}
        />
      </View>
    </View>
  );
}
