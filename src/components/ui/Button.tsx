import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "@/theme/tokens";

type Variant = "primary" | "secondary" | "ghost" | "celebrate";
type Size = "sm" | "md" | "lg";

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  testID?: string;
}

const sizeMap = {
  sm: { height: 40, paddingX: 16, fontSize: 13 },
  md: { height: 48, paddingX: 20, fontSize: 14 },
  lg: { height: 60, paddingX: 24, fontSize: 15 },
} as const;

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  fullWidth,
  leftIcon,
  rightIcon,
  testID,
}: Props) {
  const dims = sizeMap[size];
  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === "secondary" ? colors.primary : "#FFFFFF"}
        />
      ) : (
        <>
          {leftIcon}
          <Text
            style={{
              color: textColor(variant),
              fontSize: dims.fontSize,
              fontWeight: "700",
              marginHorizontal: leftIcon || rightIcon ? 8 : 0,
            }}
          >
            {label}
          </Text>
          {rightIcon}
        </>
      )}
    </>
  );

  if (variant === "celebrate") {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        testID={testID}
        style={({ pressed }) => ({
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          width: fullWidth ? "100%" : undefined,
        })}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
      >
        <LinearGradient
          colors={gradients.celebrate.colors}
          start={gradients.celebrate.start}
          end={gradients.celebrate.end}
          style={{
            height: dims.height,
            paddingHorizontal: dims.paddingX,
            borderRadius: 28,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#E87C31",
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      style={({ pressed }) => ({
        height: dims.height,
        paddingHorizontal: dims.paddingX,
        borderRadius: 11,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor(variant),
        borderWidth: variant === "secondary" ? 1 : 0,
        borderColor: colors.neutral200,
        opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
        width: fullWidth ? "100%" : undefined,
      })}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {content}
    </Pressable>
  );
}

const bgColor = (v: Variant) => {
  switch (v) {
    case "primary":
      return colors.primary;
    case "secondary":
      return colors.surface;
    case "ghost":
      return "transparent";
    default:
      return colors.primary;
  }
};

const textColor = (v: Variant) => {
  switch (v) {
    case "primary":
    case "celebrate":
      return "#FFFFFF";
    case "secondary":
      return colors.primary;
    case "ghost":
      return colors.textSecondary;
    default:
      return "#FFFFFF";
  }
};
