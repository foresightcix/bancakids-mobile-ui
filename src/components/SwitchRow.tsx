import { Pressable, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

interface Props {
  value: boolean;
  onValueChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export function SwitchRow({ value, onValueChange, label, description }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
      }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{ color: colors.textPrimary, fontSize: 14, fontWeight: "600" }}
        >
          {label}
        </Text>
        {description ? (
          <Text
            style={{ color: colors.textSecondary, fontSize: 12, lineHeight: 16 }}
          >
            {description}
          </Text>
        ) : null}
      </View>
      <Pressable
        onPress={() => onValueChange(!value)}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        accessibilityLabel={label}
        style={({ pressed }) => ({
          width: 48,
          height: 28,
          borderRadius: 14,
          backgroundColor: value ? colors.primary : colors.neutral200,
          padding: 2,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#FFFFFF",
            transform: [{ translateX: value ? 20 : 0 }],
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 1 },
          }}
        />
      </Pressable>
    </View>
  );
}
