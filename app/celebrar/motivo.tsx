import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Trophy,
  Star,
  House,
  Cake,
  DotsThree,
  type IconProps,
} from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCelebrarFlow, type CelebMotivo } from "@/store/celebrarFlow";
import { colors } from "@/theme/tokens";

const MOTIVOS: {
  key: CelebMotivo;
  label: string;
  Icon: React.ComponentType<IconProps>;
}[] = [
  { key: "completo_meta", label: "Completó una meta", Icon: Trophy },
  { key: "buen_comportamiento", label: "Buen comportamiento", Icon: Star },
  { key: "ayudo_mucho", label: "Ayudó mucho en casa", Icon: House },
  { key: "cumple", label: "Cumpleaños", Icon: Cake },
  { key: "otro", label: "Otro motivo", Icon: DotsThree },
];

export default function CelebrarMotivoScreen() {
  const router = useRouter();
  const { motivo, setMotivo } = useCelebrarFlow();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={1}
        totalSteps={3}
        title="¿Qué celebramos?"
        subtitle="Cuéntanos por qué hoy es especial para Sofi"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 10,
        }}
      >
        {MOTIVOS.map(({ key, label, Icon }) => {
          const selected = motivo === key;
          return (
            <Pressable
              key={key}
              onPress={() => setMotivo(key)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                backgroundColor: selected ? colors.primarySoft : "#FFFFFF",
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : "#EEF2F7",
                borderRadius: 14,
                padding: 16,
                opacity: pressed ? 0.9 : 1,
              })}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={label}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: selected
                    ? colors.primary
                    : colors.neutral150,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  size={20}
                  color={selected ? "#FFFFFF" : colors.primary}
                  weight="fill"
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  color: selected ? colors.primary : colors.textPrimary,
                  fontSize: 15,
                  fontWeight: selected ? "700" : "600",
                }}
              >
                {label}
              </Text>
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
        })}
      </ScrollView>
      <FlowFooter
        label="Siguiente"
        onPress={() => router.push("/celebrar/modo" as never)}
        disabled={!motivo}
      />
    </View>
  );
}
