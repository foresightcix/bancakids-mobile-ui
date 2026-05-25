import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Book,
  CaretDown,
  ClockCounterClockwise,
  MapPin,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { BottomTabBar } from "@/components/BottomTabBar";
import { MissionCard } from "@/components/MissionCard";
import { Chip } from "@/components/ui/Chip";
import {
  LoadingSkeleton,
  ErrorState,
  EmptyState,
  OfflineBanner,
} from "@/components/states";
import { api } from "@/api";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import type { MissionCategory } from "@/types";
import { colors } from "@/theme/tokens";

type Filter = MissionCategory | "all";

const CHIPS: { key: Filter; label: string }[] = [
  { key: "ahorrar", label: "Ahorrar" },
  { key: "gastar_bien", label: "Gastar bien" },
  { key: "compartir", label: "Compartir" },
  { key: "ganar", label: "Ganar" },
];

export default function EnsenarTab() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("ahorrar");
  const { data: missions, status, reload } = useAsyncResource(
    () => api.getMissions(),
    [],
  );

  const ordered = useMemo(() => {
    if (!missions) return [];
    const sorted = [...missions].sort((a, b) => {
      const order: Record<string, number> = {
        in_progress: 0,
        active: 1,
        completed: 2,
        locked: 3,
      };
      return (order[a.status] ?? 9) - (order[b.status] ?? 9);
    });
    if (filter === "all") return sorted;
    return [
      ...sorted.filter((m) => m.category === filter),
      ...sorted.filter((m) => m.category !== filter),
    ];
  }, [missions, filter]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OfflineBanner />
      <AppHeader variant="secondary" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 4, paddingTop: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Enseñar
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Elige una misión para aprender juntos sobre el dinero
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, maxHeight: 48 }}
          contentContainerStyle={{ gap: 8, alignItems: "center" }}
        >
          {CHIPS.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              active={filter === c.key}
              onPress={() => setFilter(c.key)}
            />
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.neutral150,
            borderRadius: 11,
            borderWidth: 1,
            borderColor: colors.neutral200,
            paddingVertical: 10,
            paddingHorizontal: 14,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MapPin size={18} color={colors.muted} />
            <Text
              style={{
                color: colors.textTertiary,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              Ubicación: Casa
            </Text>
          </View>
          <CaretDown size={16} color={colors.placeholder} />
        </View>

        {status === "loading" || status === "idle" ? (
          <LoadingSkeleton rows={4} />
        ) : status === "error" ? (
          <ErrorState onRetry={reload} />
        ) : ordered.length === 0 ? (
          <EmptyState
            Icon={Book}
            title="Aún sin misiones"
            description="Pronto añadiremos nuevas misiones para Sofi."
          />
        ) : (
          <>
            <View style={{ gap: 10 }}>
              {ordered.map((m) => (
                <MissionCard key={m.id} mission={m} />
              ))}
            </View>

            <Pressable
              onPress={() => router.push("/insights" as never)}
              accessibilityRole="button"
              style={({ pressed }) => ({
                backgroundColor: colors.neutral100,
                borderRadius: 11,
                borderWidth: 1,
                borderColor: colors.neutral200,
                paddingVertical: 12,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
                opacity: pressed ? 0.8 : 1,
                marginTop: 4,
              })}
            >
              <ClockCounterClockwise size={18} color={colors.muted} />
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Ver historial de actividades
              </Text>
              <ArrowRight size={14} color={colors.placeholder} weight="bold" />
            </Pressable>
          </>
        )}
      </ScrollView>
      <BottomTabBar activeKey="ensenar" />
    </View>
  );
}
