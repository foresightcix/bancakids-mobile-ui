import { Animated, View, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { colors } from "@/theme/tokens";

interface Props {
  /** Variante según el contexto */
  variant?: "card" | "list" | "hero";
  rows?: number;
}

/**
 * Loading Skeleton (LMyRA del .pen) — radius 18 padding 20 gap 16.
 * Anima opacity suavemente entre 0.6 y 1 para sensación de "cargando".
 */
export function LoadingSkeleton({ variant = "card", rows = 3 }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        gap: 16,
      }}
      accessibilityLabel="Cargando"
      accessibilityRole="progressbar"
    >
      {variant !== "hero" && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#E5E7EB",
            }}
          />
          <View style={{ flex: 1, gap: 8 }}>
            <View
              style={{
                width: "70%",
                height: 14,
                borderRadius: 7,
                backgroundColor: "#E5E7EB",
              }}
            />
            <View
              style={{
                width: "45%",
                height: 10,
                borderRadius: 5,
                backgroundColor: "#F3F4F6",
              }}
            />
          </View>
        </View>
      )}
      {variant === "hero" && (
        <View
          style={{
            height: 176,
            borderRadius: 28,
            backgroundColor: "#E5E7EB",
          }}
        />
      )}
      {Array.from({ length: rows }).map((_, i) => (
        <View
          key={i}
          style={{
            height: i === rows - 1 ? 60 : 100,
            borderRadius: 11,
            backgroundColor: i % 2 === 0 ? "#E5E7EB" : "#F3F4F6",
          }}
        />
      ))}
    </Animated.View>
  );
}
