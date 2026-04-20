import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Coins, Star } from "phosphor-react-native";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { api } from "@/api";
import type { SavingGoal } from "@/types";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

const CONFETTI_DOTS = [
  { x: 20, y: 10, size: 12, color: "#FCD34D" },
  { x: 60, y: 35, size: 10, color: "#E87C31" },
  { x: 110, y: 5, size: 14, color: "#F472B6" },
  { x: 150, y: 40, size: 11, color: "#10B981" },
  { x: 200, y: 15, size: 13, color: "#FCD34D" },
  { x: 240, y: 38, size: 9, color: "#F472B6" },
  { x: 270, y: 8, size: 12, color: "#E87C31" },
  { x: 45, y: 48, size: 8, color: "#10B981" },
  { x: 180, y: 28, size: 10, color: "#FCD34D" },
];

export default function CelebracionMeta() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<SavingGoal | null>(null);

  // Animación de entrada
  const piggyScale = useRef(new Animated.Value(0.3)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const confettiY = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    api.getGoals().then((gs) => setGoal(gs.find((g) => g.id === id) ?? null));
    Animated.parallel([
      Animated.spring(piggyScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(confettiY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [id, piggyScale, contentOpacity, confettiY]);

  return (
    <LinearGradient
      colors={["#1E69FF", "#6C5CE7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 40,
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Confetti */}
        <Animated.View
          style={{
            width: 300,
            height: 60,
            position: "relative",
            transform: [{ translateY: confettiY }],
          }}
        >
          {CONFETTI_DOTS.map((d, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                left: d.x,
                top: d.y,
                width: d.size,
                height: d.size,
                borderRadius: d.size / 2,
                backgroundColor: d.color,
              }}
            />
          ))}
        </Animated.View>

        {/* Piggy */}
        <Animated.View style={{ transform: [{ scale: piggyScale }] }}>
          <PiggyIllustration size={200} />
        </Animated.View>

        <Animated.View
          style={{
            opacity: contentOpacity,
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 36, fontWeight: "700" }}>
            ¡Felicidades!
          </Text>
          <Text
            style={{
              color: "#FFFFFFCC",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Sofi ha completado su meta
          </Text>
        </Animated.View>

        {/* Achievement card */}
        <Animated.View
          style={{
            opacity: contentOpacity,
            width: "100%",
            backgroundColor: "#FFFFFF30",
            borderRadius: 24,
            padding: 24,
            gap: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Star size={24} color="#FCD34D" weight="fill" />
            <Text
              style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
            >
              Meta: {goal?.title ?? "…"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Coins size={24} color="#FCD34D" weight="fill" />
            <Text
              style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
            >
              Ahorro: {formatCurrency(goal?.currentAmount ?? 0)}
            </Text>
          </View>
        </Animated.View>

        {/* Buttons */}
        <Animated.View
          style={{
            opacity: contentOpacity,
            width: "100%",
            gap: 12,
          }}
        >
          <Pressable
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Compartir"
            style={({ pressed }) => ({
              height: 52,
              borderRadius: 18,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
            >
              Compartir
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/(tabs)" as never)}
            accessibilityRole="button"
            accessibilityLabel="Volver al inicio"
            style={({ pressed }) => ({
              height: 52,
              borderRadius: 18,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{ color: colors.primary, fontSize: 16, fontWeight: "600" }}
            >
              Volver al inicio
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}
