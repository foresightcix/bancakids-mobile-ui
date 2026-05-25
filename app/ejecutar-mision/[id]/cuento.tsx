import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowCounterClockwise,
  ArrowRight,
  Clock,
  SpeakerHigh,
} from "phosphor-react-native";
import { MisionStepIndicator } from "@/components/MisionStepIndicator";
import { Button } from "@/components/ui/Button";
import { SuccessToast } from "@/components/states";
import { useMissionAttempts } from "@/store/missionAttempts";
import { colors } from "@/theme/tokens";

const STORY_PAGES = [
  {
    title: "La ardilla Camila y su primer ahorro",
    duration: "5 min",
    age: "6+",
    paragraphs: [
      {
        text: "A veces su amigo el ratón le ofrecía galletas a cambio de sus nueces.",
        style: "normal" as const,
      },
      {
        text: "—No, gracias —decía Camila—. Estoy ahorrando.",
        style: "normal" as const,
      },
      {
        text: "—¿Para qué? —preguntaba el ratón.",
        style: "italic" as const,
      },
      {
        text: "—Para algo que vale la pena esperar.",
        style: "highlight" as const,
      },
    ],
  },
];

export default function Cuento() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [page, setPage] = useState(3);
  const [toast, setToast] = useState<string | null>(null);
  const attempt = useMissionAttempts((s) => s.getCount(id ?? "")) + 1;
  const story = STORY_PAGES[0];

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <MisionStepIndicator
        step={2}
        totalSteps={4}
        stepLabel="Cuento"
        backLabel="Cuento"
        attempt={attempt}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 2,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          Pág. {page} de 6
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 24,
        }}
      >
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {story.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Clock size={14} color={colors.muted} />
              <Text style={{ color: colors.muted, fontSize: 12 }}>
                {story.duration}
              </Text>
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
                  fontWeight: "700",
                }}
              >
                {story.age} años
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 1, backgroundColor: colors.neutral100 }} />

        <View style={{ gap: 16 }}>
          {story.paragraphs.map((p, i) => (
            <Text
              key={i}
              style={{
                color:
                  p.style === "highlight"
                    ? colors.primary
                    : p.style === "italic"
                      ? colors.textSecondary
                      : colors.textPrimary,
                fontSize: 16,
                fontWeight: p.style === "highlight" ? "600" : "normal",
                fontStyle: p.style === "italic" ? "italic" : "normal",
                lineHeight: 26,
              }}
            >
              {p.text}
            </Text>
          ))}
        </View>

        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 11,
            borderWidth: 1,
            borderColor: "#BBDEFB",
            height: 44,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <SpeakerHigh size={18} color={colors.primary} weight="fill" />
          <Text
            style={{
              color: colors.primary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            🔊 Escuchar desde la alcancía
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12, gap: 10 }}>
        <Button
          label="Continuar"
          variant="primary"
          size="md"
          fullWidth
          rightIcon={<ArrowRight size={18} color="#FFFFFF" weight="bold" />}
          onPress={() =>
            router.replace(`/ejecutar-mision/${id}/guia-mision` as never)
          }
        />
        <Button
          label="Volver a escuchar"
          variant="secondary"
          size="sm"
          fullWidth
          leftIcon={
            <ArrowCounterClockwise size={16} color={colors.textTertiary} />
          }
          onPress={() => setToast("Reproduciendo cuento desde la alcancía")}
        />
      </View>

      <SuccessToast
        visible={toast !== null}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </View>
  );
}
