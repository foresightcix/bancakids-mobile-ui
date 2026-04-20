import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { User } from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCargarFlow, type CargarSender } from "@/store/cargarFlow";
import { colors } from "@/theme/tokens";

const SENDERS: {
  key: CargarSender;
  name: string;
  role?: string;
}[] = [
  { key: "mama", name: "Mamá", role: "Apoderado/a de la cuenta" },
  { key: "papa", name: "Papá" },
  { key: "abuelo", name: "Abuelo" },
  { key: "abuela", name: "Abuela" },
  { key: "tio", name: "Tío" },
];

export default function QuienEnviaScreen() {
  const router = useRouter();
  const { sender, setSender, otroSender, setOtroSender } = useCargarFlow();

  const onSubmit = () => {
    if (!sender) return;
    if (sender === "otro" && !otroSender.trim()) return;
    router.push("/flujo-cargar/confirmacion" as never);
  };

  const disabled = !sender || (sender === "otro" && !otroSender.trim());

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={3}
        totalSteps={4}
        title="¿Quién envía?"
        subtitle="Selecciona quién le está enviando dinero"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {SENDERS.map((s) => {
          const selected = sender === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setSender(s.key)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                backgroundColor: selected ? colors.primarySoft : "#FFFFFF",
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : "#EEF2F7",
                borderRadius: 14,
                padding: 14,
                opacity: pressed ? 0.92 : 1,
              })}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={`Remitente ${s.name}`}
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
                <User
                  size={22}
                  color={selected ? "#FFFFFF" : colors.textSecondary}
                  weight="fill"
                />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: selected ? colors.primary : colors.textPrimary,
                    fontSize: 15,
                    fontWeight: selected ? "700" : "600",
                  }}
                >
                  {s.name}
                </Text>
                {s.role || selected ? (
                  <Text
                    style={{
                      color: selected ? colors.primary : colors.textSecondary,
                      fontSize: 11,
                      fontWeight: "500",
                    }}
                  >
                    {s.role ?? "Toca para seleccionar"}
                  </Text>
                ) : null}
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
        })}

        {/* Otro con input */}
        <Pressable
          onPress={() => setSender("otro")}
          style={({ pressed }) => ({
            backgroundColor:
              sender === "otro" ? colors.primarySoft : "#FFFFFF",
            borderWidth: sender === "otro" ? 2 : 1,
            borderColor: sender === "otro" ? colors.primary : "#EEF2F7",
            borderRadius: 14,
            padding: 14,
            gap: 10,
            opacity: pressed ? 0.92 : 1,
          })}
          accessibilityRole="radio"
          accessibilityState={{ selected: sender === "otro" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor:
                  sender === "otro" ? colors.primary : colors.neutral150,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User
                size={22}
                color={sender === "otro" ? "#FFFFFF" : colors.textSecondary}
                weight="fill"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color:
                    sender === "otro" ? colors.primary : colors.textPrimary,
                  fontSize: 15,
                  fontWeight: sender === "otro" ? "700" : "600",
                }}
              >
                Otro
              </Text>
            </View>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: sender === "otro" ? colors.primary : "#D1D5DB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sender === "otro" ? (
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
          </View>
          <TextInput
            value={otroSender}
            onChangeText={setOtroSender}
            onFocus={() => setSender("otro")}
            placeholder="Escribe el parentesco..."
            placeholderTextColor={colors.placeholder}
            style={{
              backgroundColor: "#F5F7FA",
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 12,
              fontSize: 13,
              color: colors.textPrimary,
              borderWidth:
                sender === "otro" && !otroSender.trim() ? 1 : 0,
              borderColor: "#DC2626",
            }}
          />
        </Pressable>
      </ScrollView>
      <FlowFooter label="Siguiente" onPress={onSubmit} disabled={disabled} />
    </View>
  );
}
