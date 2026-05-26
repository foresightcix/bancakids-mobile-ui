import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Trophy,
  House,
  Gift,
  Star,
  Coin,
  DotsThree,
  PiggyBank,
  Target,
  Check,
  type IconProps,
} from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCargarFlow, type CargarMotivo } from "@/store/cargarFlow";
import { api } from "@/api";
import type { SavingGoal } from "@/types";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";
import { BottomTabBar } from "@/components/BottomTabBar";

const MOTIVOS: {
  key: CargarMotivo;
  label: string;
  Icon: React.ComponentType<IconProps>;
}[] = [
  { key: "propina", label: "Propina", Icon: Trophy },
  { key: "ayudo_casa", label: "Ayudó en casa", Icon: House },
  { key: "cumpleanos", label: "Cumpleaños", Icon: Gift },
  { key: "comportamiento", label: "Comportamiento", Icon: Star },
  { key: "mesada", label: "Mesada", Icon: Coin },
  { key: "otro", label: "Otro", Icon: DotsThree },
];

export default function MotivoScreen() {
  const router = useRouter();
  const {
    motivo,
    setMotivo,
    destinoTipo,
    destinoMetaId,
    destinoMetaTitle,
    setDestinoAlcancia,
    setDestinoMeta,
  } = useCargarFlow();
  const [goals, setGoals] = useState<SavingGoal[]>([]);

  useEffect(() => {
    api.getGoals().then((gs) => setGoals(gs.filter((g) => !g.completed)));
  }, []);

  const rows: (typeof MOTIVOS)[number][][] = [];
  for (let i = 0; i < MOTIVOS.length; i += 2) {
    rows.push(MOTIVOS.slice(i, i + 2));
  }

  const onSubmit = () => {
    if (!motivo) return;
    if (destinoTipo === "meta" && !destinoMetaId) return;
    router.push("/flujo-cargar/quien-envia" as never);
  };

  const disabled =
    !motivo || (destinoTipo === "meta" && !destinoMetaId);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={2}
        totalSteps={4}
        title="Motivo y destino"
        subtitle="¿Por qué cargas dinero y dónde va?"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 20,
        }}
      >
        {/* Motivo */}
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Motivo de carga
          </Text>
          {rows.map((row, idx) => (
            <View key={idx} style={{ flexDirection: "row", gap: 10 }}>
              {row.map(({ key, label, Icon }) => {
                const selected = motivo === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => setMotivo(key)}
                    style={({ pressed }) => ({
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      backgroundColor: selected ? colors.primarySoft : "#FFFFFF",
                      borderWidth: selected ? 2 : 1,
                      borderColor: selected ? colors.primary : "#EEF2F7",
                      borderRadius: 14,
                      padding: 14,
                      opacity: pressed ? 0.9 : 1,
                    })}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Motivo ${label}`}
                  >
                    <Icon size={20} color={colors.primary} weight="fill" />
                    <Text
                      style={{
                        color: selected ? colors.primary : colors.textPrimary,
                        fontSize: 13,
                        fontWeight: selected ? "700" : "600",
                      }}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={{ height: 1, backgroundColor: "#EEF2F7" }} />

        {/* Destino */}
        <View style={{ gap: 10 }}>
          <View style={{ gap: 2 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              ¿A dónde va el dinero?
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                lineHeight: 17,
              }}
            >
              Cárgalo libre a su alcancía o asígnalo a una meta específica.
            </Text>
          </View>

          {/* Opción 1: Alcancía */}
          <DestinoOption
            selected={destinoTipo === "alcancia"}
            onPress={setDestinoAlcancia}
            Icon={PiggyBank}
            title="Alcancía de Sofi"
            subtitle="Saldo general, ella decide cómo usarlo"
            accessibilityLabel="Destino: Alcancía"
          />

          {/* Opción 2: Meta específica */}
          <DestinoOption
            selected={destinoTipo === "meta"}
            onPress={() => {
              if (goals.length > 0 && !destinoMetaId) {
                setDestinoMeta(goals[0].id, goals[0].title);
              } else if (goals.length === 0) {
                // No hay metas, no permite seleccionar
                return;
              }
            }}
            Icon={Target}
            title="Una meta de ahorro"
            subtitle={
              goals.length === 0
                ? "No hay metas activas todavía"
                : `${goals.length} meta${goals.length === 1 ? "" : "s"} disponible${goals.length === 1 ? "" : "s"}`
            }
            accessibilityLabel="Destino: Meta"
            disabled={goals.length === 0}
          />

          {/* Sub-lista de metas si se eligió "meta" */}
          {destinoTipo === "meta" && goals.length > 0 ? (
            <View style={{ gap: 8, paddingLeft: 8 }}>
              {goals.map((g) => {
                const selected = destinoMetaId === g.id;
                const pct = Math.round(
                  (g.currentAmount / g.targetAmount) * 100,
                );
                return (
                  <Pressable
                    key={g.id}
                    onPress={() => setDestinoMeta(g.id, g.title)}
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      backgroundColor: selected
                        ? colors.primarySoft
                        : "#FFFFFF",
                      borderWidth: 1,
                      borderColor: selected ? colors.primary : "#EEF2F7",
                      borderRadius: 12,
                      padding: 12,
                      opacity: pressed ? 0.9 : 1,
                    })}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Meta ${g.title}`}
                  >
                    <Text style={{ fontSize: 22 }}>{g.emoji}</Text>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          color: colors.textPrimary,
                          fontSize: 13,
                          fontWeight: "700",
                        }}
                        numberOfLines={1}
                      >
                        {g.title}
                      </Text>
                      <Text
                        style={{
                          color: colors.textSecondary,
                          fontSize: 11,
                        }}
                      >
                        {formatCurrency(g.currentAmount)} de{" "}
                        {formatCurrency(g.targetAmount)} · {pct}%
                      </Text>
                    </View>
                    {selected ? (
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          backgroundColor: colors.primary,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={14} color="#FFFFFF" weight="bold" />
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          borderWidth: 2,
                          borderColor: "#D1D5DB",
                        }}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
      </ScrollView>
      <FlowFooter label="Siguiente" onPress={onSubmit} disabled={disabled} />
      <BottomTabBar activeKey="cargar" />
    </View>
  );
}

function DestinoOption({
  selected,
  onPress,
  Icon,
  title,
  subtitle,
  accessibilityLabel,
  disabled = false,
}: {
  selected: boolean;
  onPress: () => void;
  Icon: React.ComponentType<IconProps>;
  title: string;
  subtitle: string;
  accessibilityLabel: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: selected ? colors.primarySoft : "#FFFFFF",
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? colors.primary : "#EEF2F7",
        borderRadius: 14,
        padding: 14,
        opacity: disabled ? 0.45 : pressed ? 0.9 : 1,
      })}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: selected ? colors.primary : colors.neutral150,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          size={22}
          color={selected ? "#FFFFFF" : colors.textSecondary}
          weight="fill"
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: selected ? colors.primary : colors.textPrimary,
            fontSize: 14,
            fontWeight: selected ? "700" : "600",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
          }}
        >
          {subtitle}
        </Text>
      </View>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: selected ? colors.primary : "#D1D5DB",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colors.primary,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
