import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Microphone,
  Stop,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { SuccessToast } from "@/components/states";
import { colors } from "@/theme/tokens";

export default function FeedbackPadre() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordedSeconds, setRecordedSeconds] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const hasFeedback = comment.trim().length > 0 || recordedSeconds !== null;

  const onToggleRecord = () => {
    if (!recording) {
      setRecording(true);
      setRecordedSeconds(null);
      // Simula grabación: al tocar de nuevo, guarda duración aleatoria demo
      setTimeout(() => {
        setRecording(false);
        setRecordedSeconds(12);
        setToast("Audio grabado · 0:12");
      }, 2500);
    } else {
      setRecording(false);
      setRecordedSeconds(12);
    }
  };

  const onContinue = () => {
    if (!hasFeedback) {
      setError(true);
      return;
    }
    setError(false);
    router.replace(`/ejecutar-mision/${id}/evaluacion` as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <AppHeader variant="home" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Tu turno como padre
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "500",
              lineHeight: 20,
            }}
          >
            Comparte tus observaciones sobre cómo le fue a tu hijo en la misión
          </Text>
        </View>

        {/* Info card azul */}
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 14,
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CheckCircle size={22} color="#2E7D32" weight="fill" />
          <Text
            style={{
              flex: 1,
              color: colors.primary,
              fontSize: 13,
              fontWeight: "500",
              lineHeight: 18,
            }}
          >
            Tu hijo ya le contó a la alcancía cómo le fue. Ahora es tu turno de
            dar tu perspectiva.
          </Text>
        </View>

        {/* Comentario section */}
        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            ¿Cómo observaste a tu hijo durante la misión?
          </Text>
          <TextInput
            value={comment}
            onChangeText={(t) => {
              setComment(t);
              if (error) setError(false);
            }}
            placeholder="Escribe tus observaciones sobre cómo actuó, qué dijo, cómo se sintió..."
            placeholderTextColor={colors.placeholder}
            multiline
            style={{
              minHeight: 120,
              borderRadius: 11,
              borderWidth: 1.5,
              borderColor: error && !comment.trim() && !recordedSeconds
                ? "#DC2626"
                : "#EEF2F7",
              padding: 16,
              fontSize: 14,
              lineHeight: 20,
              color: colors.textPrimary,
              textAlignVertical: "top",
            }}
          />
        </View>

        {/* Voice section */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            O graba un audio
          </Text>
          <Pressable
            onPress={onToggleRecord}
            accessibilityRole="button"
            accessibilityLabel={
              recording ? "Detener grabación" : "Grabar observación de voz"
            }
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              height: 48,
              borderRadius: 11,
              borderWidth: 1.5,
              borderColor: recording ? "#DC2626" : "#EEF2F7",
              backgroundColor: recording ? "#FEE2E2" : "#FFFFFF",
              opacity: pressed ? 0.88 : 1,
            })}
          >
            {recording ? (
              <Stop size={20} color="#DC2626" weight="fill" />
            ) : (
              <Microphone size={20} color={colors.primary} weight="fill" />
            )}
            <Text
              style={{
                color: recording ? "#DC2626" : colors.primary,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {recording
                ? "Detener grabación"
                : recordedSeconds !== null
                  ? `Audio grabado · 0:${String(recordedSeconds).padStart(2, "0")}`
                  : "Grabar observación de voz"}
            </Text>
          </Pressable>
        </View>

        {error ? (
          <Text style={{ color: "#DC2626", fontSize: 12 }}>
            Escribe o graba al menos una observación
          </Text>
        ) : null}

        {/* Tip card */}
        <View
          style={{
            backgroundColor: "#FFF3E0",
            borderRadius: 11,
            padding: 12,
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Lightbulb size={20} color={colors.accent} weight="fill" />
          <Text
            style={{
              flex: 1,
              color: "#92400E",
              fontSize: 12,
              fontWeight: "500",
              lineHeight: 17,
            }}
          >
            Sé honesto/a con tus observaciones. Esto ayudará a generar un mejor
            insight de aprendizaje.
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Pressable
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Continuar a evaluación"
          style={({ pressed }) => ({
            backgroundColor: "#2E7D32",
            height: 48,
            borderRadius: 11,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700" }}>
            Continuar a evaluación
          </Text>
          <ArrowRight size={18} color="#FFFFFF" weight="bold" />
        </Pressable>
      </View>

      <SuccessToast
        visible={toast !== null}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </KeyboardAvoidingView>
  );
}
