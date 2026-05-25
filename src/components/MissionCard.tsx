import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Coin,
  ShoppingCart,
  HandHeart,
  Storefront,
  LockSimple,
  Lightbulb,
} from "phosphor-react-native";
import { ProgressBar } from "./ui/ProgressBar";
import { colors } from "@/theme/tokens";
import type { Mission, MissionCategory } from "@/types";

interface Props {
  mission: Mission;
}

const iconByCategory: Record<
  MissionCategory,
  { Icon: typeof Coin; iconBg: string; iconColor: string; tagLabel: string; tagColor: string; tagBg: string }
> = {
  ahorrar: {
    Icon: Coin,
    iconBg: "#FFF3E0",
    iconColor: colors.accent,
    tagLabel: "Ahorrar",
    tagColor: colors.primary,
    tagBg: colors.primarySoft,
  },
  gastar_bien: {
    Icon: ShoppingCart,
    iconBg: colors.primarySoft,
    iconColor: colors.primary,
    tagLabel: "Gastar bien",
    tagColor: "#E65100",
    tagBg: "#FFF3E0",
  },
  compartir: {
    Icon: HandHeart,
    iconBg: colors.neutral100,
    iconColor: colors.placeholder,
    tagLabel: "Compartir",
    tagColor: colors.placeholder,
    tagBg: colors.neutral100,
  },
  ganar: {
    Icon: Storefront,
    iconBg: colors.neutral100,
    iconColor: colors.placeholder,
    tagLabel: "Ganar",
    tagColor: colors.placeholder,
    tagBg: colors.neutral100,
  },
};

export function MissionCard({ mission }: Props) {
  const router = useRouter();
  const cfg = iconByCategory[mission.category];
  const locked = mission.status === "locked";
  const completed = mission.status === "completed";
  const Icon = locked ? LockSimple : cfg.Icon;
  const iconBg = locked ? colors.neutral100 : cfg.iconBg;
  const iconColor = locked ? colors.placeholder : cfg.iconColor;
  const nameColor = locked ? colors.placeholder : colors.textHeading;

  const isActive = mission.status === "active";
  const borderColor =
    mission.status === "in_progress" || isActive
      ? mission.borderColor
      : colors.neutral200;
  const borderWidth =
    mission.status === "in_progress" || isActive ? 1.5 : 1;

  return (
    <Pressable
      onPress={() =>
        !locked && router.push(`/mision/${mission.id}` as never)
      }
      disabled={locked}
      accessibilityRole="button"
      accessibilityLabel={`Misión: ${mission.title}`}
      accessibilityState={{ disabled: locked }}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderRadius: 11,
        padding: 14,
        borderWidth,
        borderColor,
        gap: 10,
        opacity: locked ? 0.6 : pressed ? 0.92 : 1,
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: iconBg,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={iconColor} weight="fill" />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                color: nameColor,
                fontSize: 14,
                fontWeight: "600",
              }}
              numberOfLines={1}
            >
              {mission.title}
            </Text>
            {mission.insight && !locked ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Lightbulb size={12} color={colors.muted} weight="fill" />
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: 11,
                    fontWeight: "500",
                  }}
                  numberOfLines={1}
                >
                  Insight disponible
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            backgroundColor: mission.tagBg,
            borderRadius: 8,
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text
            style={{
              color: locked
                ? colors.placeholder
                : mission.status === "in_progress"
                  ? mission.category === "ahorrar"
                    ? "#92400E"
                    : "#2E7D32"
                  : colors.textHeading,
              fontSize: 11,
              fontWeight: "600",
            }}
          >
            {mission.tagLabel}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: cfg.tagBg,
          borderRadius: 8,
          paddingVertical: 3,
          paddingHorizontal: 8,
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{
            color: cfg.tagColor,
            fontSize: 11,
            fontWeight: "600",
          }}
        >
          {cfg.tagLabel}
        </Text>
      </View>

      {!locked && !completed ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={mission.progress}
              height={6}
              trackColor={colors.neutral150}
              fillColor={
                mission.category === "ahorrar" ? colors.accent : "#2E7D32"
              }
              radius={3}
            />
          </View>
          <Text
            style={{
              color: mission.category === "ahorrar" ? "#92400E" : "#2E7D32",
              fontSize: 11,
              fontWeight: "600",
            }}
          >
            {mission.currentStep}/{mission.totalSteps}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
