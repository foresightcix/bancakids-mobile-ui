import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { IceCream, Ticket, MapPin, GameController } from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCelebrarFlow } from "@/store/celebrarFlow";
import { colors } from "@/theme/tokens";

const SUGERENCIAS: { label: string; Icon: typeof IceCream }[] = [
  { label: "Helado", Icon: IceCream },
  { label: "Cine", Icon: Ticket },
  { label: "Paseo al parque", Icon: MapPin },
  { label: "Noche de juegos", Icon: GameController },
];

export default function ModoExperienciaScreen() {
  const router = useRouter();
  const { experiencia, setExperiencia } = useCelebrarFlow();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={3}
        totalSteps={3}
        title="¿Qué experiencia?"
        subtitle="Elige una idea o escribe tu propia"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: 10 }}>
          {SUGERENCIAS.map(({ label, Icon }) => {
            const selected = experiencia === label;
            return (
              <Pressable
                key={label}
                onPress={() => setExperiencia(label)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: selected ? "#FCE7F3" : "#FFFFFF",
                  borderWidth: selected ? 2 : 1,
                  borderColor: selected ? "#DB2777" : "#EEF2F7",
                  borderRadius: 14,
                  padding: 14,
                  opacity: pressed ? 0.92 : 1,
                })}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Icon size={24} color="#DB2777" weight="fill" />
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 15,
                    fontWeight: selected ? "700" : "600",
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            O escribe tu propia idea
          </Text>
          <TextInput
            value={experiencia}
            onChangeText={setExperiencia}
            placeholder="Ej. Pizza casera"
            placeholderTextColor={colors.placeholder}
            multiline
            style={{
              borderRadius: 11,
              borderWidth: 1,
              borderColor: colors.neutral200,
              padding: 14,
              minHeight: 80,
              fontSize: 14,
              color: colors.textPrimary,
              textAlignVertical: "top",
            }}
          />
        </View>
      </ScrollView>
      <FlowFooter
        label="Celebrar"
        onPress={() => router.push("/celebrar/exito" as never)}
        disabled={!experiencia.trim()}
      />
    </View>
  );
}
