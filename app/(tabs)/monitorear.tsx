import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { PlusCircle, Target } from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { BottomTabBar } from "@/components/BottomTabBar";
import { SummaryCard } from "@/components/SummaryCard";
import { CapacidadCard } from "@/components/CapacidadCard";
import { MetaCard } from "@/components/MetaCard";
import {
  LoadingSkeleton,
  ErrorState,
  EmptyState,
  OfflineBanner,
} from "@/components/states";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { api } from "@/api";
import { colors } from "@/theme/tokens";

export default function MonitorearTab() {
  const router = useRouter();
  const { data, status, reload } = useAsyncResource(
    () =>
      Promise.all([
        api.getWeeklySummary(),
        api.getCompetencias(),
        api.getGoals(),
      ]).then(([summary, capacidades, goals]) => ({
        summary,
        capacidades,
        goals,
      })),
    [],
  );

  const primaryGoal = data?.goals.find((g) => !g.completed) ?? data?.goals[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OfflineBanner />
      <AppHeader variant="secondary" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 16,
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
            Monitorear
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Revisa cómo va el aprendizaje financiero de tu hijo/a
          </Text>
        </View>

        {status === "loading" || status === "idle" ? (
          <LoadingSkeleton rows={3} />
        ) : status === "error" ? (
          <ErrorState onRetry={reload} />
        ) : (
          <>
            {data?.summary ? <SummaryCard summary={data.summary} /> : null}

            <View style={{ gap: 12 }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Competencias financieras
              </Text>
              {(data?.capacidades ?? []).slice(0, 2).map((c) => (
                <CapacidadCard key={c.id} capacidad={c} />
              ))}
              <Pressable
                onPress={() => router.push("/capacidad" as never)}
                hitSlop={8}
                accessibilityRole="button"
                style={({ pressed }) => ({
                  alignSelf: "flex-end",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  Ver todas las competencias
                </Text>
              </Pressable>
            </View>

            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Metas de ahorro
                </Text>
                <Pressable
                  onPress={() => router.push("/meta" as never)}
                  accessibilityRole="button"
                  hitSlop={8}
                >
                  {({ pressed }) => (
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 13,
                        fontWeight: "600",
                        opacity: pressed ? 0.7 : 1,
                      }}
                    >
                      Ver todas
                    </Text>
                  )}
                </Pressable>
              </View>
              {primaryGoal ? (
                <MetaCard goal={primaryGoal} />
              ) : (
                <EmptyState
                  Icon={Target}
                  title="Aún sin metas"
                  description="Crea la primera meta de ahorro de Sofi."
                  ctaLabel="Crear meta"
                  onCta={() => router.push("/meta/crear" as never)}
                />
              )}
              <Pressable
                onPress={() => router.push("/meta/crear" as never)}
                accessibilityRole="button"
                style={({ pressed }) => ({
                  backgroundColor: colors.primary,
                  borderRadius: 11,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <PlusCircle size={18} color="#FFFFFF" weight="fill" />
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}
                >
                  Crear nueva meta de ahorro
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
      <BottomTabBar activeKey="monitorear" variant="solid" />
    </View>
  );
}
