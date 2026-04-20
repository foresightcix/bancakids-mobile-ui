import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Info } from "phosphor-react-native";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { Button } from "@/components/ui/Button";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { colors } from "@/theme/tokens";

export default function DatosCuenta() {
  const router = useRouter();
  const { phone, setPhone } = useOnboardingFlow();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>({
    defaultValues: { phone },
    mode: "onChange",
  });

  const onSubmit = async (data: { phone: string }) => {
    setLoading(true);
    setPhone(data.phone);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/(onboarding)/otp" as never);
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
          Autoriza tu Yape
        </Text>

        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: "500",
            }}
          >
            Número de celular asociado a Yape
          </Text>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Ingresa tu celular",
              pattern: {
                value: /^\d{9}$/,
                message: "Debe tener 9 dígitos",
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <View
                style={{
                  height: 48,
                  paddingHorizontal: 16,
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: errors.phone ? "#DC2626" : colors.primary,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  maxLength={9}
                  placeholder="987654321"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: colors.textHeading,
                    padding: 0,
                  }}
                />
              </View>
            )}
          />
          {errors.phone ? (
            <Text style={{ color: "#DC2626", fontSize: 12 }}>
              {errors.phone.message as string}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            backgroundColor: colors.accentSoft,
            borderRadius: 11,
            padding: 14,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Info size={18} color={colors.accent} weight="fill" />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              ¿Por qué pedimos esto?
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                lineHeight: 17,
              }}
            >
              Verificamos tu cuenta para proteger las transferencias de mesada.
              Solo tú podrás enviar dinero a la alcancía.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={loading ? "Enviando código..." : "Solicitar número de celular"}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
