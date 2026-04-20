import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Trophy,
  House,
  Gift,
  Star,
  Coin,
  DotsThree,
  CaretRight,
  type IconProps,
} from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCargarFlow, type CargarMotivo } from "@/store/cargarFlow";
import { colors } from "@/theme/tokens";

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
  const { motivo, setMotivo, destino } = useCargarFlow();

  const rows: (typeof MOTIVOS)[number][][] = [];
  for (let i = 0; i < MOTIVOS.length; i += 2) {
    rows.push(MOTIVOS.slice(i, i + 2));
  }

  const onSubmit = () => {
    if (!motivo) return;
    router.push("/flujo-cargar/quien-envia" as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={2}
        totalSteps={4}
        title="Motivo de carga"
        subtitle="Selecciona por qué cargas dinero"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 14,
        }}
      >
        <View style={{ gap: 10 }}>
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

        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Destino del ahorro
          </Text>
          <Pressable
            onPress={() => router.push("/meta" as never)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 14,
              padding: 14,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              opacity: pressed ? 0.9 : 1,
            })}
            accessibilityRole="button"
            accessibilityLabel={`Destino: ${destino}`}
          >
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Meta actual
              </Text>
              <Text
                style={{ color: colors.textPrimary, fontSize: 14 }}
                numberOfLines={1}
              >
                {destino}
              </Text>
            </View>
            <CaretRight size={16} color={colors.muted} />
          </Pressable>
        </View>
      </ScrollView>
      <FlowFooter
        label="Siguiente"
        onPress={onSubmit}
        disabled={!motivo}
      />
    </View>
  );
}
