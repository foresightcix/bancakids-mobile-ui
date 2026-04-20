import { Pressable, View, ViewStyle } from "react-native";
import { colors, shadows } from "@/theme/tokens";

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  bg?: string;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
  padding?: number | [number, number];
  shadow?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
  testID?: string;
}

export function Card({
  children,
  onPress,
  bg = colors.surface,
  borderColor,
  borderWidth = 0,
  radius = 28,
  padding = 24,
  shadow = false,
  style,
  fullWidth,
  testID,
}: Props) {
  const pad = Array.isArray(padding)
    ? { paddingVertical: padding[0], paddingHorizontal: padding[1] }
    : { padding };

  const baseStyle: ViewStyle = {
    backgroundColor: bg,
    borderRadius: radius,
    borderWidth,
    borderColor: borderColor ?? colors.neutral250,
    width: fullWidth ? "100%" : undefined,
    ...pad,
    ...(shadow ? shadows.card : {}),
    ...style,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [baseStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={baseStyle}>
      {children}
    </View>
  );
}
