import { Pressable, Text, View } from "react-native";
import { CaretRight, type IconProps } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

interface Props {
  icon: React.ComponentType<IconProps>;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  onPress: () => void;
  rightSlot?: React.ReactNode;
}

export function SettingsItem({
  icon: Icon,
  iconColor = colors.primary,
  iconBg = colors.primarySoft,
  title,
  subtitle,
  badge,
  onPress,
  rightSlot,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 14,
        opacity: pressed ? 0.88 : 1,
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: iconBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={20} color={iconColor} weight="fill" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{ color: colors.textPrimary, fontSize: 15, fontWeight: "600" }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: colors.muted, fontSize: 12 }} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {badge ? (
        <View
          style={{
            backgroundColor: "#ECFDF3",
            borderRadius: 99,
            paddingVertical: 3,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ color: "#166534", fontSize: 11, fontWeight: "700" }}>
            {badge}
          </Text>
        </View>
      ) : null}
      {rightSlot ?? <CaretRight size={18} color={colors.placeholder} />}
    </Pressable>
  );
}
