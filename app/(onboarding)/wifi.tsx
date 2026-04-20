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
import { useRouter } from "expo-router";
import {
  CheckCircle,
  Eye,
  EyeSlash,
  Lightbulb,
  LockSimple,
  WifiHigh,
  WifiLow,
  WifiMedium,
} from "phosphor-react-native";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { Button } from "@/components/ui/Button";
import { useOnboardingFlow } from "@/store/onboardingFlow";
import { colors } from "@/theme/tokens";

const NETWORKS = [
  { ssid: "Casa_WiFi_5G", Icon: WifiHigh, locked: false, active: true },
  { ssid: "Vecino_Network", Icon: WifiMedium, locked: true, active: false },
  { ssid: "Office_5G", Icon: WifiLow, locked: true, active: false },
];

export default function WifiConfig() {
  const router = useRouter();
  const { wifiSSID, wifiPassword, setWifi } = useOnboardingFlow();
  const [selected, setSelected] = useState(wifiSSID);
  const [password, setPassword] = useState(wifiPassword);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async () => {
    if (password.length < 4) {
      setError(true);
      return;
    }
    setLoading(true);
    setWifi(selected, password);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/(onboarding)/celebracion" as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <OnboardingProgress step={9} section="La alcancía física" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 20,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          Conectemos la alcancía al WiFi
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          La alcancía necesita internet para los cuentos, las actualizaciones y
          sincronizarse contigo.
        </Text>

        {/* Lista de redes */}
        <View>
          {NETWORKS.map((net, i) => {
            const isSelected = selected === net.ssid;
            return (
              <Pressable
                key={net.ssid}
                onPress={() => setSelected(net.ssid)}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 14,
                  paddingHorizontal: 4,
                  backgroundColor: isSelected ? colors.primarySoft : "#FFFFFF",
                  borderRadius: isSelected ? 11 : 0,
                  borderWidth: isSelected ? 1.5 : 0,
                  borderColor: isSelected ? colors.primary : "transparent",
                  borderBottomWidth: !isSelected && i < NETWORKS.length - 1 ? 1 : isSelected ? 1.5 : 0,
                  borderBottomColor: isSelected ? colors.primary : colors.neutral250,
                  opacity: pressed ? 0.85 : 1,
                  marginBottom: isSelected ? 4 : 0,
                })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: isSelected ? 14 : 0,
                  }}
                >
                  <net.Icon
                    size={20}
                    color={isSelected ? colors.primary : colors.muted}
                    weight={isSelected ? "fill" : "regular"}
                  />
                  <Text
                    style={{
                      color: colors.textPrimary,
                      fontSize: 14,
                      fontWeight: isSelected ? "700" : "500",
                    }}
                  >
                    {net.ssid}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: isSelected ? 14 : 0 }}>
                  {isSelected ? (
                    <CheckCircle size={20} color={colors.primary} weight="fill" />
                  ) : (
                    <LockSimple size={16} color={colors.muted} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Password */}
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Contraseña del WiFi
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.neutral100,
              borderRadius: 11,
              borderWidth: 1,
              borderColor: error ? "#DC2626" : colors.primarySoft,
              paddingHorizontal: 16,
              height: 48,
            }}
          >
            <TextInput
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (error) setError(false);
              }}
              secureTextEntry={!showPw}
              placeholder="••••••••••"
              placeholderTextColor={colors.placeholder}
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: "500",
                color: colors.textPrimary,
                padding: 0,
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
          {error ? (
            <Text style={{ color: "#DC2626", fontSize: 12 }}>
              Contraseña muy corta
            </Text>
          ) : null}
        </View>

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
              lineHeight: 17,
            }}
          >
            La alcancía funciona con redes 2.4GHz y 5GHz. Si tienes problemas,
            prueba la 2.4GHz.
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
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <Button
          label={loading ? "Conectando al WiFi..." : "Conectar al WiFi"}
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
