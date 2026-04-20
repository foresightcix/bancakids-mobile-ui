import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ShieldCheck } from "phosphor-react-native";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { Button } from "@/components/ui/Button";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { colors } from "@/theme/tokens";

export default function OtpScreen() {
  const router = useRouter();
  const { otp, setOtp } = useOnboardingFlow();
  const inputs = useRef<(TextInput | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError(false);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const complete = otp.every((d) => d.length === 1);

  const onSubmit = async () => {
    if (!complete) {
      setError(true);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/(onboarding)/prioridades" as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <OnboardingProgress step={3} section="Medio de pago" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 24,
            fontWeight: "700",
            lineHeight: 28,
          }}
        >
          Código de seguridad{"\n"}de tu banco
        </Text>

        <View
          style={{
            backgroundColor: colors.neutral100,
            borderRadius: 14,
            padding: 14,
            gap: 6,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            BCP Seguridad
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            Su código de verificación es: ******. No lo comparta con nadie.
            Válido por 5 minutos.
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(r) => {
                inputs.current[i] = r;
              }}
              value={digit}
              onChangeText={(v) => handleChange(i, v)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              accessibilityLabel={`Dígito ${i + 1}`}
              style={{
                width: 46,
                height: 54,
                borderRadius: 11,
                borderWidth: 1.5,
                borderColor: error
                  ? "#DC2626"
                  : digit
                    ? colors.primary
                    : colors.primary,
                backgroundColor: colors.neutral50,
                textAlign: "center",
                fontSize: 22,
                fontWeight: "600",
                color: colors.textPrimary,
              }}
            />
          ))}
        </View>

        {error ? (
          <Text
            style={{ color: "#DC2626", fontSize: 12, textAlign: "center" }}
          >
            Ingresa los 6 dígitos
          </Text>
        ) : null}

        <View
          style={{
            backgroundColor: "#F7D1E8",
            borderRadius: 11,
            padding: 14,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ShieldCheck size={18} color="#BE185D" weight="fill" />
          <Text
            style={{
              flex: 1,
              color: colors.textSecondary,
              fontSize: 12,
              lineHeight: 17,
            }}
          >
            Este código lo genera tu banco, no nosotros. Nunca te pediremos tu
            clave secreta.
          </Text>
        </View>

        <View style={{ flex: 1 }} />
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={loading ? "Verificando..." : "Autorizar vinculación"}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={onSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
