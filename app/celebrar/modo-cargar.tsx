import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCelebrarFlow } from "@/store/celebrarFlow";
import { colors } from "@/theme/tokens";

const QUICK = [5, 10, 20];

export default function ModoCargarScreen() {
  const router = useRouter();
  const { monto, setMonto } = useCelebrarFlow();
  const [input, setInput] = useState(monto ? String(monto) : "");

  const currentAmount = parseFloat(input || "0");

  const onNext = () => {
    const n = parseFloat(input);
    if (isNaN(n) || n <= 0) return;
    setMonto(n);
    router.push("/celebrar/exito" as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={3}
        totalSteps={3}
        title="Monto para celebrar"
        subtitle="¿Cuánto quieres cargarle a Sofi?"
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
        <View
          style={{
            borderRadius: 14,
            borderWidth: 1.5,
            borderColor: colors.primary,
            padding: 16,
            alignItems: "center",
            gap: 6,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            MONTO CELEBRACIÓN
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 36,
                fontWeight: "700",
              }}
            >
              S/.
            </Text>
            <TextInput
              value={input}
              onChangeText={(t) => setInput(t.replace(",", "."))}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.placeholder}
              style={{
                fontSize: 36,
                fontWeight: "700",
                color: colors.primary,
                minWidth: 140,
                padding: 0,
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {QUICK.map((n) => {
            const selected = currentAmount === n;
            return (
              <Pressable
                key={n}
                onPress={() => setInput(String(n))}
                style={({ pressed }) => ({
                  flex: 1,
                  height: 44,
                  borderRadius: 11,
                  borderWidth: selected ? 1.5 : 1,
                  borderColor: selected ? colors.primary : colors.neutral200,
                  backgroundColor: selected ? colors.primary : "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.85 : 1,
                })}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text
                  style={{
                    color: selected ? "#FFFFFF" : colors.textPrimary,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  S/. {n}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <FlowFooter
        label="Celebrar ahora"
        onPress={onNext}
        disabled={!(currentAmount > 0)}
      />
    </View>
  );
}
