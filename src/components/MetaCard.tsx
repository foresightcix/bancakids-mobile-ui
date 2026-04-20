import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CaretRight, Target } from "phosphor-react-native";
import { ProgressBar } from "./ui/ProgressBar";
import { colors, shadows } from "@/theme/tokens";
import type { SavingGoal } from "@/types";
import { formatCurrency, formatShortDate, percent } from "@/utils/format";

interface Props {
  goal: SavingGoal;
}

/**
 * Meta Card (`ACawx`) — bg #FFF7ED, radius 14, padding 14, gap 10.
 * Border #FDE8D0. Icon circle 28×28 con border radius 14.
 */
export function MetaCard({ goal }: Props) {
  const router = useRouter();
  const pct = percent(goal.currentAmount, goal.targetAmount);
  return (
    <Pressable
      onPress={() =>
        router.push(
          (goal.completed
            ? `/meta/completada/${goal.id}`
            : `/meta/${goal.id}`) as never,
        )
      }
      accessibilityRole="button"
      accessibilityLabel={`Meta: ${goal.title}`}
      style={({ pressed }) => ({
        backgroundColor: colors.missionPeach,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.missionPeachBorder,
        gap: 10,
        opacity: pressed ? 0.94 : 1,
        ...shadows.card,
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: colors.missionPeachBorder,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Target size={14} color={colors.accent} weight="fill" />
          </View>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "600",
              flex: 1,
            }}
            numberOfLines={1}
          >
            {goal.title}
          </Text>
        </View>
        <Text
          style={{ color: colors.accent, fontSize: 16, fontWeight: "800" }}
        >
          {pct}%
        </Text>
        <CaretRight size={18} color={colors.placeholder} />
      </View>
      <ProgressBar
        progress={pct}
        height={6}
        trackColor={colors.missionPeachBorder}
        fillColor={colors.accent}
        radius={3}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: colors.placeholder,
            fontSize: 11,
            fontWeight: "500",
          }}
        >
          {formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}
        </Text>
        {goal.deadline ? (
          <Text
            style={{
              color: colors.placeholder,
              fontSize: 11,
              fontWeight: "500",
            }}
          >
            Vence: {formatShortDate(goal.deadline)}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
