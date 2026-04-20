import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Eye, EyeSlash } from "phosphor-react-native";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { api } from "@/api";
import { useSession } from "@/store/session";
import { getHasCompletedOnboarding } from "@/hooks/useOnboardingStatus";
import { colors } from "@/theme/tokens";

interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const login = useSession((s) => s.login);
  const completeOnboarding = useSession((s) => s.completeOnboarding);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "andres.martinez@gmail.com", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setLoading(true);
    try {
      await api.login(data.email, data.password);
      login();
      // Si este dispositivo ya completó el onboarding alguna vez, saltamos
      // directo al Home. Si es primera vez, entramos al flujo Yape/WiFi.
      const alreadyOnboarded = await getHasCompletedOnboarding();
      if (alreadyOnboarded) {
        completeOnboarding();
        router.replace("/(tabs)");
      } else {
        router.push("/(onboarding)/datos-cuenta" as never);
      }
    } catch {
      setServerError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 30,
          paddingBottom: 24,
          gap: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: "center" }}>
          <Logo height={20} />
        </View>

        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            Hola de nuevo
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 15,
              lineHeight: 20,
            }}
          >
            Ingresa a la cuenta de BancaKids para ver cómo va Sofi.
          </Text>
        </View>

        <View style={{ gap: 14 }}>
          <View style={{ gap: 6 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              Correo electrónico
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Ingresa tu correo",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo no válido",
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="tu@correo.com"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    borderRadius: 11,
                    borderWidth: 1,
                    borderColor: errors.email ? "#DC2626" : colors.neutral200,
                    padding: 14,
                    fontSize: 15,
                    color: colors.textPrimary,
                  }}
                />
              )}
            />
            {errors.email ? (
              <Text style={{ color: "#DC2626", fontSize: 12 }}>
                {errors.email.message as string}
              </Text>
            ) : null}
          </View>

          <View style={{ gap: 6 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              Contraseña
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Ingresa tu contraseña",
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres",
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 11,
                    borderWidth: 1,
                    borderColor: errors.password
                      ? "#DC2626"
                      : colors.neutral200,
                    paddingRight: 14,
                  }}
                >
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPw}
                    placeholder="•••••••"
                    placeholderTextColor={colors.placeholder}
                    style={{
                      flex: 1,
                      padding: 14,
                      fontSize: 15,
                      color: colors.textPrimary,
                    }}
                  />
                  <Pressable onPress={() => setShowPw((p) => !p)} hitSlop={8}>
                    {showPw ? (
                      <EyeSlash size={20} color={colors.muted} />
                    ) : (
                      <Eye size={20} color={colors.muted} />
                    )}
                  </Pressable>
                </View>
              )}
            />
            {errors.password ? (
              <Text style={{ color: "#DC2626", fontSize: 12 }}>
                {errors.password.message as string}
              </Text>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="link"
            style={({ pressed }) => ({
              alignSelf: "flex-end",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
        </View>

        {serverError ? (
          <View
            style={{
              backgroundColor: "#FEE2E2",
              borderRadius: 11,
              padding: 12,
              borderWidth: 1,
              borderColor: "#FCA5A5",
            }}
          >
            <Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "500" }}>
              {serverError}
            </Text>
          </View>
        ) : null}

        <View style={{ flex: 1 }} />

        <Button
          label={loading ? "Ingresando..." : "Ingresar"}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
