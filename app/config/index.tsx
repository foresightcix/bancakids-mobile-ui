import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowsClockwise,
  BatteryMedium,
  WifiHigh,
  SpeakerHigh,
  UserCircle,
  Bell,
  Lock,
  Question,
  SignOut,
} from "phosphor-react-native";
import { SettingsItem } from "@/components/SettingsItem";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/ui/Button";
import { SuccessToast } from "@/components/states";
import { colors } from "@/theme/tokens";
import { useSession } from "@/store/session";

export default function ConfigHub() {
  const router = useRouter();
  const logout = useSession((s) => s.logout);
  const [showReset, setShowReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const onResetDemo = async () => {
    setResetting(true);
    try {
      await AsyncStorage.clear();
    } catch {
      /* ignore */
    }
    setResetting(false);
    setShowReset(false);
    setToast("Demo reseteada · vuelve al splash");
    // Logout y vuelve al splash para forzar el flujo completo
    setTimeout(() => {
      logout();
      router.replace("/");
    }, 700);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityLabel="Volver"
          accessibilityRole="button"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
        </Pressable>
        <Text
          style={{ color: colors.textPrimary, fontSize: 20, fontWeight: "700" }}
        >
          Configuración
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 20,
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <QuickItem Icon={BatteryMedium} label="Batería" value="78%" color="#16A34A" />
          <QuickItem Icon={WifiHigh} label="WiFi" value="Casa-5G" color={colors.primary} />
          <QuickItem Icon={SpeakerHigh} label="Volumen" value="Medio" color={colors.accent} />
        </View>

        <Section title="DISPOSITIVO">
          <SettingsItem
            icon={BatteryMedium}
            iconColor="#16A34A"
            iconBg="#DCFCE7"
            title="Batería y energía"
            subtitle="78% · 14 horas restantes"
            onPress={() => router.push("/config/bateria" as never)}
          />
          <SettingsItem
            icon={WifiHigh}
            title="Red WiFi"
            subtitle="Conectado a Casa-5G"
            badge="OK"
            onPress={() => router.push("/config/wifi" as never)}
          />
          <SettingsItem
            icon={SpeakerHigh}
            iconColor={colors.accent}
            iconBg={colors.accentSoft}
            title="Voz y sonido"
            subtitle="Volumen medio"
            onPress={() => router.push("/config/voz" as never)}
          />
        </Section>

        <Section title="PERFIL">
          <SettingsItem
            icon={UserCircle}
            title="Perfil de Sofi"
            subtitle="8 años · Personalización"
            onPress={() => router.push("/config/perfil" as never)}
          />
          <SettingsItem
            icon={Bell}
            title="Notificaciones"
            subtitle="3 activas"
            onPress={() => router.push("/config/notificaciones" as never)}
          />
          <SettingsItem
            icon={Lock}
            iconColor="#6C5CE7"
            iconBg="#EDE9FE"
            title="Privacidad y datos"
            onPress={() => router.push("/config/privacidad" as never)}
          />
        </Section>

        <Section title="APP">
          <SettingsItem
            icon={Question}
            title="Ayuda y soporte"
            onPress={() => router.push("/config/ayuda" as never)}
          />
          <SettingsItem
            icon={SignOut}
            iconColor="#DC2626"
            iconBg="#FEE2E2"
            title="Cerrar sesión"
            onPress={() => {
              logout();
              router.replace("/");
            }}
          />
        </Section>

        {/* Demo / Dev — se muestra en todos los entornos para facilitar QA */}
        <Section title="DEMO / DEV">
          <SettingsItem
            icon={ArrowsClockwise}
            iconColor="#92400E"
            iconBg="#FFF3E0"
            title="Resetear demo"
            subtitle="Borra AsyncStorage y vuelve al onboarding"
            onPress={() => setShowReset(true)}
          />
        </Section>
      </ScrollView>

      <BottomSheet
        visible={showReset}
        onClose={() => (resetting ? undefined : setShowReset(false))}
        title="¿Resetear la demo?"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
          }}
        >
          Se borrará el flag{" "}
          <Text style={{ fontWeight: "700", color: colors.textPrimary }}>
            hasCompletedOnboarding
          </Text>{" "}
          de AsyncStorage y cerraremos tu sesión. La próxima vez que ingreses
          volverás a pasar por el flujo de primera vez (Yape → Prioridades →
          Pairing → WiFi).
        </Text>
        <View style={{ gap: 10 }}>
          <Button
            label="Cancelar"
            variant="secondary"
            size="md"
            fullWidth
            disabled={resetting}
            onPress={() => setShowReset(false)}
          />
          <Button
            label={resetting ? "Reseteando..." : "Sí, resetear demo"}
            variant="primary"
            size="md"
            fullWidth
            loading={resetting}
            onPress={onResetDemo}
          />
        </View>
      </BottomSheet>

      <SuccessToast
        visible={toast !== null}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ gap: 4 }}>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 12,
          fontWeight: "600",
          letterSpacing: 0.8,
          paddingHorizontal: 14,
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function QuickItem({
  Icon,
  label,
  value,
  color,
}: {
  Icon: typeof BatteryMedium;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={{ alignItems: "center", gap: 4 }}>
      <Icon size={26} color={color} weight="fill" />
      <Text
        style={{ color: colors.textPrimary, fontSize: 13, fontWeight: "700" }}
      >
        {value}
      </Text>
      <Text style={{ color: colors.textSecondary, fontSize: 11 }}>{label}</Text>
    </View>
  );
}
