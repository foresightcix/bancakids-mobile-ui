import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  BookOpen,
  ChatCircle,
  CheckCircle,
  Lightbulb,
  Sparkle,
} from "phosphor-react-native";
import { api } from "@/api";
import type { Insight } from "@/types";
import { colors } from "@/theme/tokens";
import { formatRelativeDate } from "@/utils/format";

export default function InsightsScreen() {
  const router = useRouter();
  const { competencia: initialComp, capacidad } = useLocalSearchParams<{
    competencia?: string;
    capacidad?: string;
  }>();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activeCompetencia, setActiveCompetencia] = useState<string | "all">(
    initialComp ?? "all",
  );

  useEffect(() => {
    api.getInsights().then(setInsights);
  }, []);

  // Competencias disponibles en los insights
  const competencias = useMemo(() => {
    const set = new Set<string>();
    insights.forEach((i) => i.competencia && set.add(i.competencia));
    return Array.from(set);
  }, [insights]);

  const filtered = useMemo(() => {
    const base =
      activeCompetencia === "all"
        ? insights
        : insights.filter((i) => i.competencia === activeCompetencia);
    return [...base].sort((a, b) => (b.intento ?? 0) - (a.intento ?? 0));
  }, [insights, activeCompetencia]);

  // Capacidad asociada a la competencia actual (si hay una sola)
  const activeCapacidad =
    activeCompetencia === "all"
      ? null
      : filtered[0]?.capacidad ?? capacidad ?? null;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
        </Pressable>
        <Text
          style={{ color: colors.textPrimary, fontSize: 20, fontWeight: "700" }}
        >
          Historial de insights
        </Text>
      </View>

      {/* Competencia + capacidad header */}
      {activeCompetencia !== "all" ? (
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 12,
            gap: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                fontWeight: "600",
                letterSpacing: 0.5,
              }}
            >
              COMPETENCIA
            </Text>
          </View>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {activeCompetencia}
          </Text>
          {activeCapacidad ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: 12,
              }}
            >
              Capacidad: {activeCapacidad}
            </Text>
          ) : null}
        </View>
      ) : null}

      {/* Chips filtro por competencia */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, maxHeight: 48 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 8,
          paddingBottom: 12,
          alignItems: "center",
        }}
      >
        <CompChip
          label="Todas"
          active={activeCompetencia === "all"}
          onPress={() => setActiveCompetencia("all")}
        />
        {competencias.map((c) => (
          <CompChip
            key={c}
            label={c}
            active={activeCompetencia === c}
            onPress={() => setActiveCompetencia(c)}
          />
        ))}
      </ScrollView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 12,
        }}
      >
        {filtered.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              padding: 40,
              borderRadius: 18,
              backgroundColor: colors.neutral100,
              gap: 8,
            }}
          >
            <Lightbulb size={32} color={colors.muted} weight="fill" />
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                textAlign: "center",
                maxWidth: 240,
              }}
            >
              Aún no hay insights en esta competencia. Cada misión o escenario
              de práctica añade uno nuevo.
            </Text>
          </View>
        ) : (
          filtered.map((ins) => <InsightCard key={ins.id} ins={ins} />)
        )}
      </ScrollView>
    </View>
  );
}

function CompChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => ({
        backgroundColor: active ? colors.primary : colors.neutral150,
        borderWidth: active ? 0 : 1,
        borderColor: colors.neutral200,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text
        style={{
          color: active ? "#FFFFFF" : colors.textTertiary,
          fontSize: 13,
          fontWeight: active ? "700" : "500",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function InsightCard({ ins }: { ins: Insight }) {
  const isEscenario = ins.origen === "escenario";
  const originColor = isEscenario ? colors.accent : colors.primary;
  const originBg = isEscenario ? "#FFF3E0" : colors.primarySoft;

  return (
    <View
      style={{
        backgroundColor: "#FEF3C7",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#FCD34D",
        padding: 16,
        gap: 10,
      }}
    >
      {/* Header row: origen + intento + fecha */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              backgroundColor: originBg,
              borderRadius: 100,
              paddingVertical: 3,
              paddingHorizontal: 8,
            }}
          >
            {isEscenario ? (
              <Sparkle size={12} color={originColor} weight="fill" />
            ) : (
              <BookOpen size={12} color={originColor} weight="fill" />
            )}
            <Text
              style={{
                color: originColor,
                fontSize: 10,
                fontWeight: "700",
                letterSpacing: 0.3,
              }}
            >
              {isEscenario ? "ESCENARIO" : "MISIÓN"}
            </Text>
          </View>
          {ins.intento ? (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                paddingVertical: 3,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: "#FCD34D",
              }}
            >
              <Text
                style={{
                  color: "#92400E",
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                INTENTO #{ins.intento}
              </Text>
            </View>
          ) : null}
        </View>
        <Text style={{ color: "#92400E", fontSize: 11 }}>
          {formatRelativeDate(ins.date)}
        </Text>
      </View>

      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 15,
          fontWeight: "700",
          lineHeight: 20,
        }}
      >
        {ins.title}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 13,
          lineHeight: 19,
        }}
      >
        {ins.body}
      </Text>

      {ins.competencia ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
          }}
        >
          <CheckCircle size={14} color="#2E7D32" weight="fill" />
          <Text
            style={{
              color: "#2E7D32",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {ins.competencia}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
