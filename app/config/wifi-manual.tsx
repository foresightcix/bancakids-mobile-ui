import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CaretDown,
  Check,
  CheckCircle,
  Eye,
  EyeSlash,
  Lightbulb,
  WifiHigh,
  WifiSlash,
} from "phosphor-react-native";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/BottomSheet";
import { SuccessToast } from "@/components/states";
import { colors } from "@/theme/tokens";

type Status = "form" | "connecting" | "success" | "error";
type Security = "WPA/WPA2" | "WPA3" | "Abierta";
const SECURITY_OPTS: Security[] = ["WPA/WPA2", "WPA3", "Abierta"];

interface FormData {
  ssid: string;
  password: string;
  security: Security;
}

export default function WifiManualScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("form");
  const [showPw, setShowPw] = useState(false);
  const [showSec, setShowSec] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  // Control artificial del resultado (solo para demo)
  const [forceError, setForceError] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { ssid: "", password: "", security: "WPA/WPA2" },
    mode: "onChange",
  });

  const ssid = watch("ssid");

  const attemptConnect = async () => {
    setStatus("connecting");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus(forceError ? "error" : "success");
  };

  const onSubmit = () => attemptConnect();

  if (status === "connecting") {
    return <ConnectingView ssid={ssid || "Red WiFi"} onBack={() => setStatus("form")} />;
  }

  if (status === "success") {
    return (
      <SuccessView
        ssid={ssid}
        onContinue={() => {
          setToast("WiFi configurado correctamente");
          setTimeout(() => router.back(), 400);
        }}
      />
    );
  }

  if (status === "error") {
    return (
      <ErrorView
        ssid={ssid}
        onRetry={() => {
          // Toggle para que el segundo intento funcione
          setForceError(false);
          attemptConnect();
        }}
        onEdit={() => setStatus("form")}
      />
    );
  }

  // Form
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <FlowHeader title="Agregar red WiFi" onBack={() => router.back()} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 22,
          gap: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          Ingresa los datos de la red WiFi a la que quieres conectar la alcancía.
        </Text>

        <Field label="Nombre de la red (SSID)" error={errors.ssid?.message as string}>
          <Controller
            control={control}
            name="ssid"
            rules={{ required: "Ingresa el nombre de la red" }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej: MiRedWiFi"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                style={{
                  height: 48,
                  borderRadius: 11,
                  backgroundColor: colors.neutral100,
                  borderWidth: 1,
                  borderColor: errors.ssid ? "#DC2626" : colors.primarySoft,
                  paddingHorizontal: 16,
                  fontSize: 15,
                  color: colors.textHeading,
                }}
              />
            )}
          />
        </Field>

        <Field label="Tipo de seguridad">
          <Pressable
            onPress={() => setShowSec(true)}
            accessibilityRole="button"
            accessibilityLabel="Seleccionar tipo de seguridad"
            style={({ pressed }) => ({
              height: 48,
              borderRadius: 11,
              backgroundColor: colors.neutral100,
              borderWidth: 1,
              borderColor: colors.primarySoft,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: colors.textHeading,
                fontSize: 15,
              }}
            >
              {watch("security")}
            </Text>
            <CaretDown size={20} color={colors.textSecondary} />
          </Pressable>
        </Field>

        <Field label="Contraseña" error={errors.password?.message as string}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Ingresa la contraseña",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <View
                style={{
                  height: 48,
                  borderRadius: 11,
                  backgroundColor: colors.neutral100,
                  borderWidth: 1,
                  borderColor: errors.password
                    ? "#DC2626"
                    : colors.primarySoft,
                  paddingHorizontal: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPw}
                  placeholder="••••••••"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: colors.textHeading,
                    padding: 0,
                  }}
                />
                <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={8}>
                  {showPw ? (
                    <EyeSlash size={20} color={colors.placeholder} />
                  ) : (
                    <Eye size={20} color={colors.placeholder} />
                  )}
                </Pressable>
              </View>
            )}
          />
        </Field>

        <View
          style={{
            backgroundColor: colors.accentSoft,
            borderRadius: 11,
            paddingVertical: 10,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Lightbulb size={18} color={colors.accent} weight="fill" />
          <Text
            style={{
              flex: 1,
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: "500",
              lineHeight: 17,
            }}
          >
            Asegúrate de escribir el nombre exacto de la red, incluyendo
            mayúsculas y espacios.
          </Text>
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 11,
            lineHeight: 15,
          }}
        >
          La contraseña se guarda únicamente en la alcancía. No pasa por
          nuestros servidores.
        </Text>

        {/* Dev toggle: permite forzar error para demo */}
        <Pressable
          onPress={() => setForceError((v) => !v)}
          hitSlop={8}
          accessibilityRole="switch"
          accessibilityState={{ checked: forceError }}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              borderWidth: 1.5,
              borderColor: forceError ? colors.accent : colors.neutral200,
              backgroundColor: forceError ? colors.accent : "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {forceError ? <Check size={12} color="#FFFFFF" weight="bold" /> : null}
          </View>
          <Text style={{ color: colors.muted, fontSize: 11 }}>
            Simular error de conexión (demo)
          </Text>
        </Pressable>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label="Conectar a esta red"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <BottomSheet
        visible={showSec}
        onClose={() => setShowSec(false)}
        title="Tipo de seguridad"
      >
        <View style={{ gap: 8 }}>
          {SECURITY_OPTS.map((opt) => {
            const selected = watch("security") === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => {
                  setValue("security", opt);
                  setShowSec(false);
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                style={({ pressed }) => ({
                  padding: 14,
                  borderRadius: 11,
                  borderWidth: selected ? 2 : 1,
                  borderColor: selected ? colors.primary : colors.neutral200,
                  backgroundColor: selected ? colors.primarySoft : "#FFFFFF",
                  opacity: pressed ? 0.85 : 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                })}
              >
                <Text
                  style={{
                    color: selected ? colors.primary : colors.textPrimary,
                    fontSize: 14,
                    fontWeight: selected ? "700" : "500",
                  }}
                >
                  {opt}
                </Text>
                {selected ? (
                  <CheckCircle size={18} color={colors.primary} weight="fill" />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </BottomSheet>

      <SuccessToast
        visible={toast !== null}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </KeyboardAvoidingView>
  );
}

function FlowHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Pressable onPress={onBack} hitSlop={12}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
          </View>
        )}
      </Pressable>
      <Text
        style={{ color: colors.textPrimary, fontSize: 20, fontWeight: "700" }}
      >
        {title}
      </Text>
    </View>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 13,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      {children}
      {error ? (
        <Text style={{ color: "#DC2626", fontSize: 12 }}>{error}</Text>
      ) : null}
    </View>
  );
}

/* ───────── Connecting (dwrQQ) ───────── */
function ConnectingView({
  ssid,
  onBack,
}: {
  ssid: string;
  onBack: () => void;
}) {
  const progress = useRef(new Animated.Value(0.15)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [progress, pulse]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader title="Conectando…" onBack={onBack} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <Animated.View
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: colors.primarySoft,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: pulse }],
          }}
        >
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WifiHigh size={48} color={colors.primary} weight="fill" />
          </View>
        </Animated.View>

        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Conectando a la red…
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {ssid}
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 20,
            textAlign: "center",
            maxWidth: 260,
          }}
        >
          Esto puede tomar unos segundos.{"\n"}No cierres la app.
        </Text>

        <View
          style={{
            width: "100%",
            height: 6,
            backgroundColor: colors.neutral200,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              backgroundColor: colors.primary,
              borderRadius: 3,
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button label="Conectando…" variant="primary" size="lg" fullWidth disabled />
      </View>
    </View>
  );
}

/* ───────── Success (i8WSs) ───────── */
function SuccessView({
  ssid,
  onContinue,
}: {
  ssid: string;
  onContinue: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader title="Red WiFi" onBack={onContinue} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            backgroundColor: "#ECFDF5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle size={56} color="#059669" weight="fill" />
        </View>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          ¡Conexión exitosa!
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: colors.primarySoft,
            borderRadius: 18,
            paddingVertical: 14,
            paddingHorizontal: 20,
          }}
        >
          <WifiHigh size={24} color={colors.primary} weight="fill" />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            {ssid || "Red conectada"}
          </Text>
          <CheckCircle size={20} color={colors.primary} weight="fill" />
        </View>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 20,
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          La alcancía ya está conectada a internet.{"\n"}Puedes continuar con la
          configuración.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label="Continuar"
          variant="primary"
          size="lg"
          fullWidth
          onPress={onContinue}
        />
      </View>
    </View>
  );
}

/* ───────── Error (0AFc1) ───────── */
function ErrorView({
  ssid,
  onRetry,
  onEdit,
}: {
  ssid: string;
  onRetry: () => void;
  onEdit: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader title="Red WiFi" onBack={onEdit} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            backgroundColor: "#FEE2E2",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WifiSlash size={56} color="#DC2626" weight="fill" />
        </View>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          No se pudo conectar
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#FEE2E2",
            borderRadius: 18,
            paddingVertical: 14,
            paddingHorizontal: 20,
          }}
        >
          <WifiSlash size={20} color="#DC2626" weight="fill" />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            {ssid || "Red WiFi"}
          </Text>
        </View>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 20,
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          Revisa que el nombre y la contraseña estén correctos, y que la red
          esté disponible.
        </Text>

        <View style={{ width: "100%", gap: 8, paddingHorizontal: 10 }}>
          {[
            "Verifica que la contraseña sea correcta",
            "Prueba acercar la alcancía al router",
            "Intenta con la red de 2.4GHz",
          ].map((tip) => (
            <View
              key={tip}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Check size={16} color={colors.accent} weight="bold" />
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                {tip}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, paddingVertical: 12, gap: 10 }}>
        <Button
          label="Intentar de nuevo"
          variant="primary"
          size="lg"
          fullWidth
          onPress={onRetry}
        />
        <Button
          label="Editar datos de red"
          variant="secondary"
          size="lg"
          fullWidth
          onPress={onEdit}
        />
      </View>
    </View>
  );
}
