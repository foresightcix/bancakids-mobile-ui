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
import { Package } from "phosphor-react-native";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { Button } from "@/components/ui/Button";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { colors } from "@/theme/tokens";

export default function CodigoManual() {
  const router = useRouter();
  const setMethod = useOnboardingFlow((s) => s.setPairingMethod);
  const setCodigoAlcancia = useOnboardingFlow((s) => s.setCodigoAlcancia);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>({
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: { code: string }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setMethod("codigo");
    setCodigoAlcancia(data.code);
    router.push("/(onboarding)/wifi" as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <OnboardingProgress step={8} section="La alcancía física" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 20,
          alignItems: "center",
          gap: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Ingresa el código de tu alcancía
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            textAlign: "center",
          }}
        >
          Encuentra el código de 8 caracteres en la base de tu alcancía o en el
          interior de la caja.
        </Text>

        <Controller
          control={control}
          name="code"
          rules={{
            required: "Ingresa el código",
            pattern: {
              value: /^[A-Z]{4}-[A-Z0-9]{4}$/,
              message: "Formato: ALCA-XXXX",
            },
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <View
              style={{
                width: "100%",
                height: 56,
                borderRadius: 14,
                backgroundColor: colors.neutral100,
                borderWidth: 2,
                borderColor: errors.code ? "#DC2626" : colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                value={value}
                onChangeText={(t) => onChange(t.toUpperCase())}
                onBlur={onBlur}
                autoCapitalize="characters"
                placeholder="ALCA-7K2M"
                placeholderTextColor={colors.placeholder}
                maxLength={9}
                style={{
                  fontSize: 28,
                  fontWeight: "700",
                  color: colors.textPrimary,
                  letterSpacing: 4,
                  textAlign: "center",
                  padding: 0,
                  width: "100%",
                }}
              />
            </View>
          )}
        />
        {errors.code ? (
          <Text style={{ color: "#DC2626", fontSize: 12 }}>
            {errors.code.message as string}
          </Text>
        ) : null}

        <View
          style={{
            width: "100%",
            backgroundColor: colors.accentSoft,
            borderRadius: 14,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Package size={24} color={colors.accent} weight="fill" />
          <Text
            style={{
              flex: 1,
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: "500",
              lineHeight: 18,
            }}
          >
            En la base de la alcancía hay una etiqueta pequeña con el código
            impreso. También está en la caja, junto al código QR.
          </Text>
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Si no encuentras el código, contáctanos en Ayuda.
        </Text>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={loading ? "Conectando..." : "Conectar alcancía"}
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
