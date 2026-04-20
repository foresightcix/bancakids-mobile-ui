import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { Button } from "@/components/ui/Button";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { colors } from "@/theme/tokens";

const PRIORIDADES: { id: string; emoji: string; name: string; desc: string }[] = [
  { id: "esperar", emoji: "⏳", name: "Aprender a esperar", desc: "Que pueda resistir el impulso de gastar" },
  { id: "metas", emoji: "🎯", name: "Cumplir metas", desc: "Que termine lo que empieza" },
  { id: "hablar", emoji: "💬", name: "Hablar de dinero", desc: "Que el dinero no sea un tema tabú" },
  { id: "generosidad", emoji: "🤝", name: "Generosidad", desc: "Que entienda el valor de compartir" },
  { id: "decisiones", emoji: "💡", name: "Tomar decisiones", desc: "Que elija bien con varias opciones" },
  { id: "habitos", emoji: "🔄", name: "Hábitos constantes", desc: "Que ahorre con regularidad" },
  { id: "valor", emoji: "📊", name: "Entender el valor", desc: "Que conecte precio con esfuerzo" },
  { id: "autonomia", emoji: "🌱", name: "Autonomía", desc: "Que tome decisiones con confianza" },
];

export default function Prioridades() {
  const router = useRouter();
  const { prioridades, togglePrioridad } = useOnboardingFlow();

  const canContinue = prioridades.length > 0;

  const rows: (typeof PRIORIDADES)[] = [];
  for (let i = 0; i < PRIORIDADES.length; i += 2) {
    rows.push(PRIORIDADES.slice(i, i + 2));
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <OnboardingProgress step={7} section="Perfil de aprendizaje" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 20,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          ¿Qué te importa más a ti?
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          ¿Qué hábito o capacidad quieres que Sofi desarrolle primero? Elige
          hasta 3.
        </Text>

        <View
          style={{
            backgroundColor: "#F7D1E8",
            borderRadius: 11,
            paddingVertical: 10,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>🧠</Text>
          <Text
            style={{
              flex: 1,
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: "500",
              lineHeight: 17,
            }}
          >
            Tu contexto importa. Usamos tus prioridades para personalizar lo
            que ves.
          </Text>
        </View>

        {rows.map((row, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 10 }}>
            {row.map((p) => {
              const selected = prioridades.includes(p.id);
              const disabled = !selected && prioridades.length >= 3;
              return (
                <Pressable
                  key={p.id}
                  onPress={() => togglePrioridad(p.id)}
                  disabled={disabled}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: selected, disabled }}
                  accessibilityLabel={p.name}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: colors.neutral100,
                    borderRadius: 14,
                    padding: 12,
                    gap: 6,
                    borderWidth: selected ? 2 : 0,
                    borderColor: colors.primary,
                    opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
                  })}
                >
                  <Text style={{ fontSize: 20 }}>{p.emoji}</Text>
                  <Text
                    style={{
                      color: colors.textPrimary,
                      fontSize: 13,
                      fontWeight: "700",
                    }}
                  >
                    {p.name}
                  </Text>
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontSize: 11,
                      lineHeight: 14,
                    }}
                  >
                    {p.desc}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}

        <Text
          style={{
            color: colors.primary,
            fontSize: 13,
            fontWeight: "600",
            marginTop: 4,
          }}
        >
          {prioridades.length} de 3 prioridades seleccionadas
        </Text>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label="Estas son mis prioridades"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!canContinue}
          onPress={() => router.push("/(onboarding)/pairing" as never)}
        />
      </View>
    </View>
  );
}
