import { Pressable, View, ViewStyle } from "react-native";
import { colors } from "@/theme/tokens";

interface Props {
  children: React.ReactNode;
  size?: number;
  bg?: string;
  borderColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export function IconCircle({
  children,
  size = 34,
  bg = colors.neutral150,
  borderColor = colors.neutral200,
  onPress,
  style,
}: Props) {
  const inner = (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        borderWidth: borderColor ? 1 : 0,
        borderColor: borderColor,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {inner}
      </Pressable>
    );
  }

  return inner;
}
