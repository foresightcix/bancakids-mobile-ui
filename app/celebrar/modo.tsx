import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Coin, Ticket, ChatCircleText } from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCelebrarFlow, type CelebModo } from "@/store/celebrarFlow";
import { colors } from "@/theme/tokens";

const MODOS: {
  key: CelebModo;
  title: string;
  desc: string;
  Icon: typeof Coin;
  color: string;
  bg: string;
}[] = [
  {
    key: "cargar",
    title: "Con dinero extra",
    desc: "Cargar un monto especial en la alcancía.",
    Icon: Coin,
    color: colors.accent,
    bg: "#FFF7ED",
  },
  {
    key: "experiencia",
    title: "Con una experiencia",
    desc: "Una salida, un helado o tiempo juntos.",
    Icon: Ticket,
    color: "#DB2777",
    bg: "#FCE7F3",
  },
  {
    key: "mensaje",
    title: "Con un mensaje",
    desc: "Unas palabras que Sofi escuchará en la alcancía.",
    Icon: ChatCircleText,
    color: colors.primary,
    bg: colors.primarySoft,
  },
];

export default function ModoScreen() {
  const router = useRouter();
  const { modo, setModo } = useCelebrarFlow();

  const onNext = () => {
    if (!modo) return;
    const next =
      modo === "cargar"
        ? "/celebrar/modo-cargar"
        : modo === "experiencia"
          ? "/celebrar/modo-experiencia"
          : "/celebrar/modo-mensaje";
    router.push(next as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={2}
        totalSteps={3}
        title="¿Cómo celebramos?"
        subtitle="Elige cómo quieres que Sofi viva este momento"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 12,
        }}
      >
        {MODOS.map(({ key, title, desc, Icon, color, bg }) => {
          const selected = modo === key;
          return (
            <Pressable
              key={key}
              onPress={() => setModo(key)}
              style={({ pressed }) => ({
                backgroundColor: selected ? bg : "#FFFFFF",
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? color : "#EEF2F7",
                borderRadius: 20,
                padding: 18,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                opacity: pressed ? 0.92 : 1,
              })}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: selected ? color : colors.neutral150,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  size={26}
                  color={selected ? "#FFFFFF" : color}
                  weight="fill"
                />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 13,
                    fontWeight: "500",
                    lineHeight: 18,
                  }}
                >
                  {desc}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <FlowFooter label="Siguiente" onPress={onNext} disabled={!modo} />
    </View>
  );
}
