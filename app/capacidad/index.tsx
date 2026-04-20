import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CaretRight,
  CheckCircle,
  Coin,
  HandHeart,
  Plus,
  ShoppingCart,
  Storefront,
  type IconProps,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { colors, shadows } from "@/theme/tokens";

interface Stat {
  key: string;
  label: string;
  current: number;
  total: number;
}

const STATS: Stat[] = [
  { key: "ahorrar", label: "Ahorrar", current: 2, total: 8 },
  { key: "gastar_bien", label: "Gastar bien", current: 3, total: 6 },
  { key: "compartir", label: "Compartir", current: 1, total: 5 },
  { key: "ganar", label: "Ganar", current: 1, total: 4 },
];

const CATEGORY_ICON: Record<string, React.ComponentType<IconProps>> = {
  ahorrar: Coin,
  gastar_bien: ShoppingCart,
  compartir: HandHeart,
  ganar: Storefront,
};

const ACTIVE_GOALS = [
  {
    id: "lg_001",
    category: "ahorrar",
    description: "Meta: Juntar S/.50 en la alcancía para comprar un libro",
    badge: "Ahorrar",
    progressPercent: 66,
    progressLabel: "2 de 3 actividades",
    deadline: "15 Abr",
  },
  {
    id: "lg_002",
    category: "ahorrar",
    description: "Meta: Completar 5 misiones del tema 'El ahorro' en 2 semanas",
    badge: "Ahorrar",
    progressPercent: 40,
    progressLabel: "2 de 5 misiones",
    deadline: "5 Abr",
  },
];

const COMPLETED_GOALS = [
  {
    id: "lg_003",
    title: "Necesidades vs. gustos",
    subtitle: "Hábito observado en 3 compras",
    date: "Hace 2 semanas",
  },
  {
    id: "lg_004",
    title: "Primer ahorro propio",
    subtitle: "Decidió guardar S/.5 sin ayuda",
    date: "Hace 1 mes",
  },
];

export default function MetasAprendizaje() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="home" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Atrás"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
          <Text
            style={{ color: colors.textPrimary, fontSize: 14, fontWeight: "500" }}
          >
            Atrás
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/meta/crear" as never)}
          accessibilityRole="button"
          accessibilityLabel="Nueva meta"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.primary,
            borderRadius: 11,
            paddingVertical: 8,
            paddingHorizontal: 14,
            opacity: pressed ? 0.88 : 1,
          })}
        >
          <Plus size={14} color="#FFFFFF" weight="bold" />
          <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>
            Nueva meta
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Metas de aprendizaje
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Establece objetivos y haz seguimiento del progreso financiero de tu
            hijo/a
          </Text>
        </View>

        {/* Summary Card 2x2 */}
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 14,
            padding: 16,
            gap: 16,
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            {STATS.slice(0, 2).map((s) => (
              <StatCard key={s.key} stat={s} />
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {STATS.slice(2, 4).map((s) => (
              <StatCard key={s.key} stat={s} />
            ))}
          </View>
        </View>

        {/* Active goals */}
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            En progreso
          </Text>
          {ACTIVE_GOALS.map((g) => (
            <Pressable
              key={g.id}
              onPress={() => router.push(`/capacidad/${g.category}` as never)}
              accessibilityRole="button"
              style={({ pressed }) => ({
                backgroundColor: colors.neutral100,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.neutral200,
                padding: 14,
                gap: 10,
                opacity: pressed ? 0.92 : 1,
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
                  {(() => {
                    const Icon = CATEGORY_ICON[g.category] ?? Coin;
                    return <Icon size={18} color={colors.primary} weight="fill" />;
                  })()}
                </View>
                <View
                  style={{
                    backgroundColor: colors.primarySoft,
                    borderRadius: 11,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    {g.badge}
                  </Text>
                </View>
                <CaretRight size={18} color={colors.placeholder} />
              </View>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  lineHeight: 17,
                }}
              >
                {g.description}
              </Text>
              <View
                style={{
                  height: 6,
                  backgroundColor: colors.neutral200,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${g.progressPercent}%`,
                    backgroundColor: colors.primary,
                    borderRadius: 3,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 11,
                    fontWeight: "500",
                  }}
                >
                  {g.progressLabel}
                </Text>
                <Text
                  style={{
                    color: colors.placeholder,
                    fontSize: 11,
                    fontWeight: "500",
                  }}
                >
                  Vence: {g.deadline}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Completed goals */}
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Completadas
          </Text>
          {COMPLETED_GOALS.map((g) => (
            <View
              key={g.id}
              style={{
                backgroundColor: "#F0FDF4",
                borderWidth: 1,
                borderColor: "#DCFCE7",
                borderRadius: 14,
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                ...shadows.card,
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
                    width: 32,
                    height: 32,
                    borderRadius: 14,
                    backgroundColor: "#DCFCE7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle size={18} color="#16A34A" weight="fill" />
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
                  <Text style={{ color: colors.muted, fontSize: 11 }}>
                    {g.subtitle} · {g.date}
                  </Text>
                </View>
              </View>
              <CaretRight size={18} color={colors.placeholder} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const pct = Math.round((stat.current / stat.total) * 100);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 11,
        padding: 12,
        alignItems: "center",
        gap: 4,
      }}
    >
      <Text style={{ color: colors.primary, fontSize: 28, fontWeight: "700" }}>
        {stat.current}/{stat.total}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 11,
          fontWeight: "600",
        }}
      >
        {stat.label}
      </Text>
      <View
        style={{
          width: "100%",
          height: 8,
          backgroundColor: "#C7DBFA",
          borderRadius: 4,
          overflow: "hidden",
          marginTop: 2,
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: colors.primary,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
}
