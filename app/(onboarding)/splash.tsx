import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { colors } from "@/theme/tokens";

export default function SplashScreen() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginTop: 20 }}>
        <Logo height={20} />
      </View>

      <View style={{ alignItems: "center", gap: 28 }}>
        <PiggyIllustration size={180} />
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 32,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            BancaKids
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 16,
              fontWeight: "500",
              textAlign: "center",
              maxWidth: 300,
              lineHeight: 22,
            }}
          >
            Enseña educación financiera a tu hijo/a con una alcancía que
            aprende con ustedes.
          </Text>
        </View>
      </View>

      <View style={{ width: "100%", gap: 10 }}>
        <Button
          label="Iniciar sesión"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.push("/(onboarding)/login" as never)}
        />
        <Button
          label="Crear cuenta nueva"
          variant="secondary"
          size="md"
          fullWidth
          onPress={() => router.push("/(onboarding)/login" as never)}
        />
      </View>
    </View>
  );
}
