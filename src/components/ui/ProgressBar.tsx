import { View } from "react-native";
import { colors } from "@/theme/tokens";

interface Props {
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  radius?: number;
}

export function ProgressBar({
  progress,
  height = 6,
  trackColor = colors.primarySoft,
  fillColor = colors.primary,
  radius,
}: Props) {
  const clamped = Math.min(100, Math.max(0, progress));
  const r = radius ?? height / 2;
  return (
    <View
      style={{
        height,
        backgroundColor: trackColor,
        borderRadius: r,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${clamped}%`,
          backgroundColor: fillColor,
          borderRadius: r,
        }}
      />
    </View>
  );
}
