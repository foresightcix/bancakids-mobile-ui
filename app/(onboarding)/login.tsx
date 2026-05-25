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
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Lock,
  Sparkle,
} from "phosphor-react-native";
import { Logo } from "@/components/ui/Logo";
import { PiggyIllustration } from "@/components/PiggyIllustration";
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
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setLoading(true);
    try {
      await api.login(data.email, data.password);
      login();
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
          paddingHorizontal: 28,
          paddingTop: 30,
          paddingBottom: 20,
          gap: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo BCP */}
        <View style={{ alignItems: "center" }}>
          <Logo height={28} />
        </View>

        {/* Piggy + Sparkles */}
        <View
          style={{
            alignSelf: "center",
            width: 200,
            height: 180,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ position: "absolute", top: 10, left: 10 }}>
            <Sparkle size={22} color="#FBBF24" weight="fill" />
          </View>
          <View style={{ position: "absolute", top: 24, right: 14 }}>
            <Sparkle size={18} color={colors.primary} weight="fill" />
          </View>
          <View style={{ position: "absolute", bottom: 30, left: 28 }}>
            <Sparkle size={16} color={colors.accent} weight="fill" />
          </View>
          <PiggyIllustration size={140} />
        </View>

        {/* Title */}
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 32,
              fontWeight: "700",
            }}
          >
            ¡Bienvenido!
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Inicia sesión en tu cuenta
          </Text>
        </View>

        {/* Form */}
        <View style={{ gap: 16 }}>
          <View style={{ gap: 6 }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: "700",
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: errors.email ? "#DC2626" : colors.neutral200,
                    paddingHorizontal: 16,
                    height: 52,
                    gap: 10,
                  }}
                >
                  <EnvelopeSimple size={20} color={colors.placeholder} />
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="tucorreo@ejemplo.com"
                    placeholderTextColor={colors.placeholder}
                    style={{
                      flex: 1,
                      fontSize: 15,
                      color: colors.textPrimary,
                      padding: 0,
                    }}
                  />
                </View>
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
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Contraseña
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Ingresa tu contraseña",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: errors.password ? "#DC2626" : colors.neutral200,
                    paddingHorizontal: 16,
                    height: 52,
                    gap: 10,
                  }}
                >
                  <Lock size={20} color={colors.placeholder} />
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPw}
                    placeholder="•••••••"
                    placeholderTextColor={colors.placeholder}
                    style={{
                      flex: 1,
                      fontSize: 15,
                      color: colors.textPrimary,
                      padding: 0,
                    }}
                  />
                  <Pressable onPress={() => setShowPw((p) => !p)} hitSlop={8}>
                    {showPw ? (
                      <Eye size={20} color={colors.placeholder} />
                    ) : (
                      <EyeSlash size={20} color={colors.placeholder} />
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
              <Text
                style={{ color: "#991B1B", fontSize: 13, fontWeight: "500" }}
              >
                {serverError}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* CTA Iniciar sesión - gradient naranja */}
      <View style={{ paddingHorizontal: 28, paddingVertical: 16 }}>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Iniciar sesión"
          accessibilityState={{ disabled: loading, busy: loading }}
          style={({ pressed }) => ({
            borderRadius: 32,
            overflow: "hidden",
            opacity: loading ? 0.7 : pressed ? 0.92 : 1,
            shadowColor: colors.accent,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 12,
            elevation: 4,
          })}
        >
          <LinearGradient
            colors={["#E87C31", "#F59E0B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "700" }}>
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
