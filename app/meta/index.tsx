import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bicycle,
  BookOpen,
  CheckCircle,
  GameController,
  PersonSimpleRun,
  PiggyBank,
  Target,
  type IconProps,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import {
  LoadingSkeleton,
  ErrorState,
  EmptyState,
} from "@/components/states";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { api } from "@/api";
import type { SavingGoal } from "@/types";
import { colors } from "@/theme/tokens";
import { formatCurrency, formatShortDate, percent } from "@/utils/format";
import { BottomTabBar } from "@/components/BottomTabBar";

type Tab = "progreso" | "completadas";

function iconFor(goal: SavingGoal): React.ComponentType<IconProps> {
  const title = goal.title.toLowerCase();
  if (title.includes("bici")) return Bicycle;
  if (title.includes("libro") || title.includes("cuento")) return BookOpen;
  if (title.includes("video") || title.includes("juego")) return GameController;
  if (title.includes("patin")) return PersonSimpleRun;
  return Target;
}

function daysLeft(deadline?: string): number {
  if (!deadline) return 0;
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.round(diff / 86400000));
}

export default function MetasAhorro() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("progreso");
  const { data: goals, status, reload } = useAsyncResource(
    () => api.getGoals(),
    [],
  );

  const active = goals?.filter((g) => !g.completed) ?? [];
  const completed = goals?.filter((g) => g.completed) ?? [];
  const list = tab === "progreso" ? active : completed;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="home" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back row */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Volver a Monitorear"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingTop: 4,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Monitorear
          </Text>
        </Pressable>

        <View style={{ gap: 4 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Metas de ahorro
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            Todas las metas de ahorro de tu hijo/a
          </Text>
        </View>

        {/* Tabs */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.neutral150,
            borderRadius: 12,
            padding: 4,
            gap: 4,
          }}
        >
          <Pressable
            onPress={() => setTab("progreso")}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === "progreso" }}
            style={({ pressed }) => ({
              flex: 1,
              height: 38,
              borderRadius: 10,
              backgroundColor: tab === "progreso" ? "#FFFFFF" : "transparent",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.88 : 1,
            })}
          >
            <Text
              style={{
                color:
                  tab === "progreso" ? colors.primary : colors.textSecondary,
                fontSize: 13,
                fontWeight: tab === "progreso" ? "700" : "600",
              }}
            >
              En progreso ({active.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab("completadas")}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === "completadas" }}
            style={({ pressed }) => ({
              flex: 1,
              height: 38,
              borderRadius: 10,
              backgroundColor:
                tab === "completadas" ? "#FFFFFF" : "transparent",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.88 : 1,
            })}
          >
            <Text
              style={{
                color:
                  tab === "completadas" ? colors.primary : colors.textSecondary,
                fontSize: 13,
                fontWeight: tab === "completadas" ? "700" : "600",
              }}
            >
              Completadas ({completed.length})
            </Text>
          </Pressable>
        </View>

        {status === "loading" || status === "idle" ? (
          <LoadingSkeleton rows={3} />
        ) : status === "error" ? (
          <ErrorState onRetry={reload} />
        ) : list.length === 0 ? (
          <EmptyState
            Icon={Target}
            title={
              tab === "progreso"
                ? "Sin metas activas"
                : "Sin metas completadas"
            }
            description={
              tab === "progreso"
                ? "Crea la primera meta de ahorro para empezar."
                : "Cuando Sofi complete una meta, aparecerá aquí."
            }
            ctaLabel={tab === "progreso" ? "Crear meta" : undefined}
            onCta={
              tab === "progreso"
                ? () => router.push("/meta/crear" as never)
                : undefined
            }
          />
        ) : (
          <View style={{ gap: 12 }}>
            {list.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                onPress={() =>
                  router.push(
                    (g.completed
                      ? `/meta/completada/${g.id}`
                      : `/meta/${g.id}`) as never,
                  )
                }
              />
            ))}
          </View>
        )}

        {/* Completadas recientemente preview (solo si tab=progreso) */}
        {tab === "progreso" && completed.length > 0 ? (
          <View style={{ gap: 10, marginTop: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Completadas recientemente
            </Text>
            {completed.slice(0, 1).map((g) => {
              const Icon = iconFor(g);
              return (
                <Pressable
                  key={g.id}
                  onPress={() =>
                    router.push(`/meta/completada/${g.id}` as never)
                  }
                  accessibilityRole="button"
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    backgroundColor: "#F9FAFB",
                    borderWidth: 1,
                    borderColor: colors.neutral200,
                    borderRadius: 14,
                    padding: 14,
                    opacity: pressed ? 0.92 : 1,
                  })}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#E8F5E9",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle size={20} color="#2E7D32" weight="fill" />
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text
                      style={{
                        color: colors.textPrimary,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {g.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Icon size={12} color={colors.muted} weight="fill" />
                      <Text style={{ color: colors.muted, fontSize: 11 }}>
                        {formatCurrency(g.targetAmount)} · completada
                      </Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "center", gap: 2 }}>
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: colors.missionPeach,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PiggyBank size={16} color={colors.accent} weight="fill" />
                    </View>
                    <Text
                      style={{
                        color: colors.accent,
                        fontSize: 9,
                        fontWeight: "700",
                      }}
                    >
                      Rompió
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
      <BottomTabBar activeKey="monitorear" />
    </View>
  );
}

function GoalCard({
  goal,
  onPress,
}: {
  goal: SavingGoal;
  onPress: () => void;
}) {
  const Icon = iconFor(goal);
  const pct = percent(goal.currentAmount, goal.targetAmount);
  const days = daysLeft(goal.deadline);
  const isCompleted = goal.completed;
  const progressColor = isCompleted
    ? "#16A34A"
    : pct < 30
      ? colors.accent
      : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Meta: ${goal.title}`}
      style={({ pressed }) => ({
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: colors.neutral200,
        borderRadius: 14,
        padding: 16,
        gap: 12,
        opacity: pressed ? 0.94 : 1,
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
            gap: 10,
            flex: 1,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: isCompleted ? "#DCFCE7" : colors.primarySoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              size={20}
              color={isCompleted ? "#16A34A" : colors.primary}
              weight="fill"
            />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 15,
                fontWeight: "700",
              }}
              numberOfLines={1}
            >
              {goal.title}
            </Text>
            <Text style={{ color: colors.muted, fontSize: 12 }}>
              {isCompleted
                ? "Meta cumplida"
                : days > 0
                  ? `Quedan ${days} días`
                  : "Sin plazo"}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: isCompleted ? "#DCFCE7" : colors.primarySoft,
            borderRadius: 100,
            paddingVertical: 4,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: isCompleted ? "#16A34A" : colors.primary,
              fontSize: 11,
              fontWeight: "700",
            }}
          >
            {isCompleted ? "Completada" : "En progreso"}
          </Text>
        </View>
      </View>

      {/* Stats row: Actual / Meta / Plazo */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <StatCell label="Actual" value={formatCurrency(goal.currentAmount)} />
        <StatCell label="Meta" value={formatCurrency(goal.targetAmount)} />
        <StatCell
          label="Plazo"
          value={goal.deadline ? formatShortDate(goal.deadline) : "—"}
        />
      </View>

      <View
        style={{
          height: 8,
          backgroundColor: colors.neutral200,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: progressColor,
            borderRadius: 4,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: progressColor,
            fontSize: 11,
            fontWeight: "600",
          }}
        >
          {pct}% completado
        </Text>
        <Text style={{ color: colors.placeholder, fontSize: 11 }}>
          {days > 0 ? `${days} días` : "Meta cumplida"}
        </Text>
      </View>
    </Pressable>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        padding: 10,
        gap: 2,
      }}
    >
      <Text style={{ color: colors.muted, fontSize: 11 }}>{label}</Text>
      <Text
        style={{ color: colors.textPrimary, fontSize: 13, fontWeight: "700" }}
      >
        {value}
      </Text>
    </View>
  );
}
