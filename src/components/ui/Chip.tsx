import { Pressable, Text, ViewStyle } from "react-native";
import { colors } from "@/theme/tokens";

interface Props {
  label: string;
  active?: boolean;
  onPress?: () => void;
  size?: "sm" | "md";
  style?: ViewStyle;
}

export function Chip({ label, active = false, onPress, size = "md", style }: Props) {
  const padding =
    size === "sm"
      ? { paddingVertical: 4, paddingHorizontal: 10 }
      : { paddingVertical: 6, paddingHorizontal: 14 };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 20,
        backgroundColor: active ? colors.primary : colors.neutral150,
        borderWidth: active ? 0 : 1,
        borderColor: colors.neutral200,
        alignItems: "center",
        justifyContent: "center",
        opacity: pressed ? 0.75 : 1,
        ...padding,
        ...style,
      })}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text
        style={{
          color: active ? "#FFFFFF" : colors.textTertiary,
          fontSize: 13,
          fontWeight: active ? "600" : "500",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
