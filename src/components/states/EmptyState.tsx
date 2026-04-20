import { Pressable, Text, View } from "react-native";
import { MagnifyingGlass, Plus, type IconProps } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

interface Props {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  Icon?: React.ComponentType<IconProps>;
}

/**
 * Empty State (iZbur del .pen) — card blanca radius 18 padding 32.
 * Icon circle 120×120 #E1EEFB con magnifying-glass + title + desc + CTA.
 */
export function EmptyState({
  title = "Nada por aquí... aún",
  description = "Cuando haya actividad,\naparecerá en esta sección.",
  ctaLabel = "Comenzar",
  onCta,
  Icon = MagnifyingGlass,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
      accessibilityRole="none"
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: colors.primarySoft,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={48} color={colors.primary} weight="fill" />
      </View>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 18,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          lineHeight: 21,
          textAlign: "center",
          maxWidth: 260,
        }}
      >
        {description}
      </Text>
      {onCta ? (
        <Pressable
          onPress={onCta}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: colors.primary,
            borderRadius: 11,
            paddingVertical: 12,
            paddingHorizontal: 24,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Plus size={18} color="#FFFFFF" weight="bold" />
          <Text
            style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}
          >
            {ctaLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
