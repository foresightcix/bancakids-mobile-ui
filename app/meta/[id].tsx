import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  PencilSimple,
  Target,
  TrendUp,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api } from "@/api";
import type { SavingGoal, Transaction } from "@/types";
import { colors } from "@/theme/tokens";
import { formatCurrency, formatShortDate, percent } from "@/utils/format";
import { BottomTabBar } from "@/components/BottomTabBar";

export default function MetaDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<SavingGoal | null>(null);
  const [aportes, setAportes] = useState<Transaction[]>([]);

  useEffect(() => {
    (async () => {
      const [goals, txs] = await Promise.all([
        api.getGoals(),
        api.getTransactions(),
      ]);
      const g = goals.find((x) => x.id === id) ?? null;
      setGoal(g);
      setAportes(
        txs.filter(
          (t) => t.type === "meta_aporte" || t.type === "carga",
        ),
      );
    })();
  }, [id]);

  if (!goal) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <AppHeader variant="secondary" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.muted }}>Cargando meta…</Text>
        </View>
      </View>
    );
  }

  const pct = percent(goal.currentAmount, goal.targetAmount);
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 4,
            alignSelf: "flex-start",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={20} color={colors.textHeading} weight="bold" />
          <Text
            style={{ color: colors.textPrimary, fontSize: 14, fontWeight: "600" }}
          >
            Volver
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <View
          style={{
            backgroundColor: colors.missionPeach,
            borderRadius: 24,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.missionPeachBorder,
            gap: 12,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.missionPeachBorder,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Target size={20} color={colors.accent} weight="fill" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                META DE AHORRO
              </Text>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {goal.title}
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 36,
              fontWeight: "700",
            }}
          >
            {formatCurrency(goal.currentAmount)}
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {" "}
              de {formatCurrency(goal.targetAmount)}
            </Text>
          </Text>

          <ProgressBar
            progress={pct}
            height={10}
            trackColor={colors.missionPeachBorder}
            fillColor={colors.accent}
            radius={5}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <TrendUp size={16} color="#166534" weight="bold" />
              <Text
                style={{ color: "#166534", fontSize: 12, fontWeight: "600" }}
              >
                {pct}% logrado
              </Text>
            </View>
            {goal.deadline ? (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Calendar size={16} color={colors.muted} weight="fill" />
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  Vence: {formatShortDate(goal.deadline)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {!goal.completed ? (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              backgroundColor: colors.primarySoft,
              borderRadius: 14,
              padding: 14,
            }}
          >
            <Text
              style={{
                flex: 1,
                color: colors.textPrimary,
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 18,
              }}
            >
              Faltan {formatCurrency(remaining)} para lograrla. ¡Carga un poco
              más y celébralo con Sofi!
            </Text>
          </View>
        ) : null}

        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Últimos aportes
          </Text>
          {aportes.slice(0, 4).map((t) => (
            <View
              key={t.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "#EEF2F7",
              }}
            >
              <View>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {t.concept}
                </Text>
                <Text style={{ color: colors.muted, fontSize: 11 }}>
                  {t.sender ?? ""} · {formatShortDate(t.date)}
                </Text>
              </View>
              <Text
                style={{ color: "#166534", fontSize: 14, fontWeight: "700" }}
              >
                +{formatCurrency(t.amount)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          gap: 10,
          backgroundColor: "#FFFFFF",
        }}
      >
        {!goal.completed ? (
          <Button
            label="Cargar a esta meta"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => router.push("/flujo-cargar/monto" as never)}
          />
        ) : (
          <Button
            label="Ver resumen de la meta"
            variant="primary"
            size="md"
            fullWidth
            onPress={() =>
              router.push(`/meta/completada/${goal.id}` as never)
            }
          />
        )}
        <Button
          label="Editar meta"
          variant="ghost"
          size="sm"
          fullWidth
          leftIcon={<PencilSimple size={14} color={colors.textSecondary} />}
          onPress={() => router.push(`/meta/editar/${goal.id}` as never)}
        />
      </View>
      <BottomTabBar activeKey="monitorear" />
    </View>
  );
}
