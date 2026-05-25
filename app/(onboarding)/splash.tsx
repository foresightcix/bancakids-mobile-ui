import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowRight,
  Bank,
  BookOpen,
  ChartLineUp,
  Coin,
  GraduationCap,
  Heart,
  ShieldCheck,
  type IconProps,
} from "phosphor-react-native";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { colors } from "@/theme/tokens";

interface Step {
  Icon: React.ComponentType<IconProps>;
  title: string;
  duration: string;
}

const STEPS: Step[] = [
  { Icon: Bank, title: "Autorizar Yape", duration: "2 min" },
  { Icon: BookOpen, title: "Perfil de aprendizaje de tu hijo", duration: "3 min" },
  { Icon: Coin, title: "Conectar la alcancía", duration: "2 min" },
];

interface Feature {
  Icon: React.ComponentType<IconProps>;
  label: string;
}

const FEATURES: Feature[] = [
  { Icon: GraduationCap, label: "Educa" },
  { Icon: ShieldCheck, label: "Protege" },
  { Icon: ChartLineUp, label: "Monitorea" },
  { Icon: Heart, label: "Conecta" },
];

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 40,
          paddingBottom: 24,
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <PiggyIllustration size={160} />

        <View style={{ alignItems: "center", gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 28,
              fontWeight: "700",
              lineHeight: 34,
              textAlign: "center",
            }}
          >
            La primera alcancía{"\n"}de tu hijo.
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 15,
              fontWeight: "500",
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Diseñada para aprender, no solo para guardar.
          </Text>
        </View>

        {/* Steps list */}
        <View style={{ width: "100%", gap: 12 }}>
          {STEPS.map(({ Icon, title, duration }) => (
            <View
              key={title}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: 4,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.primarySoft,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} color={colors.primary} weight="regular" />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  {title}
                </Text>
                <Text style={{ color: colors.muted, fontSize: 13 }}>
                  {duration}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Highlight card */}
        <View
          style={{
            width: "100%",
            backgroundColor: colors.primarySoft,
            borderRadius: 16,
            padding: 16,
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <GraduationCap size={26} color={colors.primary} weight="fill" />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Diseñado con expertos en educación
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                lineHeight: 18,
              }}
            >
              Creado junto a psicólogos infantiles y especialistas en educación
              financiera.
            </Text>
          </View>
        </View>

        {/* Tagline + features */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 16,
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 19,
              fontWeight: "700",
              textAlign: "center",
              lineHeight: 26,
              maxWidth: 300,
            }}
          >
            La primera alcancía inteligente que enseña a tu hijo a ahorrar.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              paddingHorizontal: 12,
            }}
          >
            {FEATURES.map(({ Icon, label }) => (
              <View key={label} style={{ alignItems: "center", gap: 6 }}>
                <Icon size={26} color={colors.primary} weight="regular" />
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* CTA Comenzar - gradient azul */}
      <View style={{ paddingHorizontal: 24, paddingVertical: 14 }}>
        <Pressable
          onPress={() => router.push("/(onboarding)/login" as never)}
          accessibilityRole="button"
          accessibilityLabel="Comenzar"
          style={({ pressed }) => ({
            borderRadius: 32,
            overflow: "hidden",
            opacity: pressed ? 0.92 : 1,
            shadowColor: colors.primary,
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 12,
            elevation: 4,
          })}
        >
          <LinearGradient
            colors={["#1E69FF", "#3B82F6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}>
              Comenzar
            </Text>
            <ArrowRight size={20} color="#FFFFFF" weight="bold" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
