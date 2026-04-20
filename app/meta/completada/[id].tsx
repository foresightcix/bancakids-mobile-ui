import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  ChartLineUp,
  Clock,
  Coin,
  Gear,
  Info,
  PiggyBank,
  Question,
  Sparkle,
  Trophy,
} from "phosphor-react-native";
import { Logo } from "@/components/ui/Logo";
import { IconCircle } from "@/components/ui/IconCircle";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/BottomSheet";
import { Bank, ArrowsClockwise } from "phosphor-react-native";
import { api } from "@/api";
import type { SavingGoal } from "@/types";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

export default function MetaCompletada() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<SavingGoal | null>(null);
  const [showTransfer, setShowTransfer] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [transferring, setTransferring] = useState(false);

  useEffect(() => {
    api.getGoals().then((gs) => setGoal(gs.find((g) => g.id === id) ?? null));
  }, [id]);

  const onConfirmTransfer = async () => {
    setTransferring(true);
    await new Promise((r) => setTimeout(r, 1200));
    setTransferring(false);
    setClaimed(true);
    setShowTransfer(false);
    // Tras 800ms navega a la animación de celebración
    setTimeout(() => router.push(`/meta/celebracion/${id}` as never), 800);
  };

  if (!goal) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.muted }}>Cargando meta…</Text>
        </View>
      </View>
    );
  }

  // Stats calculadas (demo): tiempo total 45 días, ahorro promedio
  const totalDias = 45;
  const ahorroPromedio = goal.currentAmount / totalDias;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <View
        style={{
          height: 56,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconCircle size={32} bg={colors.primarySoft} borderColor="">
            <Question size={18} color={colors.textHeading} />
          </IconCircle>
          <IconCircle size={32} bg={colors.primarySoft} borderColor="">
            <Gear size={18} color={colors.textHeading} />
          </IconCircle>
          <IconCircle size={32} bg={colors.primarySoft} borderColor="">
            <Bell size={18} color={colors.textHeading} />
          </IconCircle>
        </View>
      </View>

      {/* Back row */}
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Volver"
        style={({ pressed }) => ({
          height: 40,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <ArrowLeft size={22} color={colors.textHeading} weight="bold" />
        <Text
          style={{ color: colors.textHeading, fontSize: 17, fontWeight: "600" }}
        >
          Meta completada
        </Text>
      </Pressable>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration area gradient */}
        <LinearGradient
          colors={["#E1EEFB", "#C8F0D8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: 180,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ position: "absolute", left: 40, top: 10 }}>
            <Sparkle size={20} color="#F59E0B" weight="fill" />
          </View>
          <View style={{ position: "absolute", right: 60, top: 20 }}>
            <Sparkle size={16} color={colors.primary} weight="fill" />
          </View>
          <View style={{ position: "absolute", right: 40, bottom: 30 }}>
            <Sparkle size={14} color="#34D399" weight="fill" />
          </View>
          <Trophy size={28} color="#F59E0B" weight="fill" />
          <PiggyIllustration size={100} />
        </LinearGradient>

        {/* Goal title */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 4,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.textHeading,
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {goal.title}
          </Text>
        </View>

        {/* Stats grid 2x2 */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 8, gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <StatCard
              Icon={Clock}
              iconColor={colors.primary}
              label="Tiempo total"
              value={`${totalDias} días`}
            />
            <StatCard
              Icon={Coin}
              iconColor={colors.primary}
              label="Monto logrado"
              value={formatCurrency(goal.currentAmount)}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <StatCard
              Icon={ChartLineUp}
              iconColor={colors.primary}
              label="Ahorro promedio"
              value={`${formatCurrency(ahorroPromedio)}/día`}
            />
            <StatCard
              Icon={CalendarCheck}
              iconColor="#34D399"
              label="Plazo cumplido"
              value="Sí ✓"
              valueColor="#16A34A"
            />
          </View>
        </View>

        {/* Divider */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 4 }}>
          <View style={{ height: 1, backgroundColor: colors.neutral200 }} />
        </View>

        {/* Reward section */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12, gap: 10 }}>
          <Text
            style={{
              color: colors.textHeading,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Estado de recompensa
          </Text>
          <View
            style={{
              backgroundColor: colors.primarySoft,
              borderRadius: 11,
              padding: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <PiggyBank size={28} color={colors.accent} weight="fill" />
            <Text
              style={{
                flex: 1,
                color: colors.textHeading,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              {claimed
                ? "Chanchito roto · transferencia iniciada"
                : "Aún no ha roto el chanchito"}
            </Text>
          </View>
          {/* Gradient button "Romper chanchito 🎉" */}
          <Pressable
            onPress={() => setShowTransfer(true)}
            disabled={claimed}
            accessibilityRole="button"
            accessibilityLabel="Romper chanchito"
            style={({ pressed }) => ({
              opacity: claimed ? 0.5 : pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            })}
          >
            <LinearGradient
              colors={["#E87C31", "#F59E0B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 48,
                borderRadius: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                {claimed ? "Chanchito roto ✓" : "Romper chanchito 🎉"}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Info card */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 4 }}>
          <View
            style={{
              backgroundColor: colors.primarySoft,
              borderRadius: 11,
              padding: 14,
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <Info size={20} color={colors.primary} weight="fill" />
            <Text
              style={{
                flex: 1,
                color: colors.textTertiary,
                fontSize: 12,
                lineHeight: 17,
              }}
            >
              Al romper el chanchito, recibirás un mensaje personalizado para
              realizar una transferencia entre tus cuentas BCP por el monto
              ahorrado.
            </Text>
          </View>
        </View>

        {/* Back button */}
        <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          <Button
            label="Volver a las metas"
            variant="secondary"
            size="sm"
            fullWidth
            onPress={() => router.push("/meta" as never)}
          />
        </View>
      </ScrollView>

      {/* BCP Transfer BottomSheet */}
      <BottomSheet
        visible={showTransfer}
        onClose={() => (transferring ? undefined : setShowTransfer(false))}
        title="Romper chanchito 🎉"
      >
        <View style={{ gap: 14 }}>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 19,
            }}
          >
            Sofi logró su meta. Para entregarle el dinero, realiza una
            transferencia entre tus cuentas BCP por el monto ahorrado.
          </Text>

          {/* Mensaje personalizado BCP */}
          <View
            style={{
              backgroundColor: colors.primarySoft,
              borderRadius: 14,
              padding: 16,
              gap: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Bank size={20} color={colors.primary} weight="fill" />
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 0.4,
                }}
              >
                MENSAJE BCP
              </Text>
            </View>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "600",
                lineHeight: 20,
              }}
            >
              Hola Andrés, Sofi completó su meta "{goal.title}".
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                lineHeight: 19,
              }}
            >
              Puedes transferir{" "}
              <Text style={{ fontWeight: "700", color: colors.primary }}>
                {formatCurrency(goal.currentAmount)}
              </Text>{" "}
              desde tu cuenta BCP Soles (****3421) hacia su cuenta de ahorro
              junior (****7890) para que disponga del monto.
            </Text>
          </View>

          {/* Detalle cuentas */}
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.neutral200,
              borderRadius: 11,
              padding: 14,
              gap: 10,
            }}
          >
            <AccountRow label="Origen" account="Cuenta Soles ****3421" />
            <View style={{ height: 1, backgroundColor: colors.neutral100 }} />
            <AccountRow label="Destino" account="Ahorro Junior ****7890" />
            <View style={{ height: 1, backgroundColor: colors.neutral100 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: colors.muted, fontSize: 12 }}>Monto</Text>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {formatCurrency(goal.currentAmount)}
              </Text>
            </View>
          </View>

          <View style={{ gap: 10, marginTop: 4 }}>
            <Button
              label="Cancelar"
              variant="secondary"
              size="md"
              fullWidth
              disabled={transferring}
              onPress={() => setShowTransfer(false)}
            />
            <Pressable
              onPress={onConfirmTransfer}
              disabled={transferring}
              accessibilityRole="button"
              accessibilityLabel="Confirmar transferencia"
              style={({ pressed }) => ({
                opacity: transferring ? 0.6 : pressed ? 0.9 : 1,
              })}
            >
              <LinearGradient
                colors={["#E87C31", "#F59E0B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 48,
                  borderRadius: 11,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {transferring ? (
                  <ArrowsClockwise size={18} color="#FFFFFF" weight="bold" />
                ) : (
                  <Bank size={18} color="#FFFFFF" weight="fill" />
                )}
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  {transferring
                    ? "Procesando..."
                    : `Transferir ${formatCurrency(goal.currentAmount)}`}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

function AccountRow({ label, account }: { label: string; account: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: colors.muted, fontSize: 12 }}>{label}</Text>
      <Text
        style={{ color: colors.textPrimary, fontSize: 13, fontWeight: "600" }}
      >
        {account}
      </Text>
    </View>
  );
}

function StatCard({
  Icon,
  iconColor,
  label,
  value,
  valueColor = colors.textHeading,
}: {
  Icon: typeof Clock;
  iconColor: string;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primarySoft,
        borderRadius: 11,
        padding: 12,
        gap: 6,
      }}
    >
      <Icon size={22} color={iconColor} weight="fill" />
      <Text
        style={{ color: colors.textTertiary, fontSize: 11, fontWeight: "400" }}
      >
        {label}
      </Text>
      <Text style={{ color: valueColor, fontSize: 16, fontWeight: "700" }}>
        {value}
      </Text>
    </View>
  );
}
