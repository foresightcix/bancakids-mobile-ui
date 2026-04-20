import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, Easing } from "react-native";
import { CheckCircle, X } from "phosphor-react-native";

interface Props {
  visible: boolean;
  message: string;
  onClose: () => void;
  autoHideMs?: number;
}

/**
 * Success Toast (Qyq5R del .pen) — pill bg #ECFDF5 border #A7F3D0.
 * Se auto-oculta después de `autoHideMs` con animación fade+translate.
 */
export function SuccessToast({
  visible,
  message,
  onClose,
  autoHideMs = 3000,
}: Props) {
  const translateY = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
      const t = setTimeout(onClose, autoHideMs);
      return () => clearTimeout(t);
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -60,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity, autoHideMs, onClose]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={{
        position: "absolute",
        top: 16,
        left: 20,
        right: 20,
        transform: [{ translateY }],
        opacity,
        zIndex: 100,
      }}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <View
        style={{
          backgroundColor: "#ECFDF5",
          borderRadius: 11,
          borderWidth: 1,
          borderColor: "#A7F3D0",
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        <CheckCircle size={22} color="#059669" weight="fill" />
        <Text
          style={{
            flex: 1,
            color: "#065F46",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {message}
        </Text>
        <Pressable
          onPress={onClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Cerrar"
        >
          <X size={16} color="#6B7280" weight="bold" />
        </Pressable>
      </View>
    </Animated.View>
  );
}
