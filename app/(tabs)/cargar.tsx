import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Coin, Plus, TrendUp } from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { BottomTabBar } from "@/components/BottomTabBar";
import { TransactionRow } from "@/components/TransactionRow";
import { Button } from "@/components/ui/Button";
import {
  LoadingSkeleton,
  ErrorState,
  EmptyState,
  OfflineBanner,
} from "@/components/states";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { api } from "@/api";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

export default function CargarTab() {
  const router = useRouter();
  const { data, status, reload } = useAsyncResource(
    () =>
      Promise.all([api.getChild(), api.getTransactions()]).then(
        ([child, transactions]) => ({ child, transactions }),
      ),
    [],
  );

  const child = data?.child;
  const transactions = data?.transactions ?? [];

  const thisMonth = transactions
    .filter((t) => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => acc + t.amount, 0);

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
            Cargar dinero
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Añade saldo a la alcancía de {child?.name ?? "tu hijo/a"} en segundos.
          </Text>
        </View>

        {status === "loading" || status === "idle" ? (
          <LoadingSkeleton variant="hero" rows={3} />
        ) : status === "error" ? (
          <ErrorState onRetry={reload} />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.primarySoft,
                borderRadius: 24,
                padding: 22,
                gap: 14,
              }}
            >
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 11,
                  fontWeight: "700",
                  letterSpacing: 0.6,
                }}
              >
                SALDO ACTUAL
              </Text>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 36,
                  fontWeight: "700",
                }}
              >
                {formatCurrency(child?.balance ?? 0)}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 11,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  alignSelf: "flex-start",
                }}
              >
                <TrendUp size={14} color="#2E7D32" weight="bold" />
                <Text
                  style={{ color: "#2E7D32", fontSize: 12, fontWeight: "600" }}
                >
                  +{formatCurrency(thisMonth)} este mes
                </Text>
              </View>
              <Button
                label="Cargar dinero ahora"
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<Plus size={18} color="#FFFFFF" weight="bold" />}
                onPress={() => router.push("/flujo-cargar/monto" as never)}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 24,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.neutral250,
                gap: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Movimientos recientes
                </Text>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {transactions.length} total
                </Text>
              </View>

              {transactions.length === 0 ? (
                <EmptyState
                  Icon={Coin}
                  title="Aún no hay movimientos"
                  description={"Cuando cargues dinero,\naparecerá en esta lista."}
                  ctaLabel="Cargar ahora"
                  onCta={() => router.push("/flujo-cargar/monto" as never)}
                />
              ) : (
                transactions.map((tx, idx) => (
                  <View key={tx.id}>
                    <TransactionRow tx={tx} />
                    {idx < transactions.length - 1 ? (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: colors.neutral250,
                        }}
                      />
                    ) : null}
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
      <BottomTabBar activeKey="cargar" />
    </View>
  );
}
