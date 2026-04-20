import { Text, View } from "react-native";
import { colors } from "@/theme/tokens";
import type { WeeklySummary } from "@/types";

interface Props {
  summary: WeeklySummary;
}

/**
 * Summary Card (`T7XOp`) — bg #E1EEFB, radius 14, padding 16, gap 16.
 * 3 stats interior con cards blancas radius 11 padding 12.
 */
export function SummaryCard({ summary }: Props) {
  const stats = [
    { num: summary.interactions, label: "Interacciones", color: colors.primary },
    { num: summary.minutes, label: "Minutos", color: colors.accent },
    {
      num: summary.missionsCompleted,
      label: "Misiones",
      color: colors.primary,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: colors.primarySoft,
        borderRadius: 14,
        padding: 16,
        gap: 16,
      }}
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
            backgroundColor: colors.primary,
            borderRadius: 18,
            paddingVertical: 4,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            ESTA SEMANA
          </Text>
        </View>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          {summary.label}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        {stats.map((s) => (
          <View
            key={s.label}
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 11,
              padding: 12,
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{ color: s.color, fontSize: 28, fontWeight: "700" }}
            >
              {s.num}
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              {s.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
