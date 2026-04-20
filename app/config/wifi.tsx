import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { WifiHigh, Plus } from "phosphor-react-native";
import { SimpleScreen } from "@/components/SimpleScreen";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/tokens";

interface Network {
  ssid: string;
  strength: number;
  connected: boolean;
}

const NETWORKS: Network[] = [
  { ssid: "Casa-5G", strength: 4, connected: true },
  { ssid: "Casa-2.4G", strength: 3, connected: false },
  { ssid: "VecinoWifi", strength: 2, connected: false },
];

export default function WifiScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("Casa-5G");

  return (
    <SimpleScreen
      title="Red WiFi"
      subtitle="La alcancía está conectada a Casa-5G"
    >
      <View style={{ gap: 8 }}>
        {NETWORKS.map((n) => {
          const active = selected === n.ssid;
          return (
            <Pressable
              key={n.ssid}
              onPress={() => setSelected(n.ssid)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                borderWidth: 1,
                borderColor: active ? colors.primary : "#EEF2F7",
                borderRadius: 14,
                padding: 14,
                backgroundColor: active ? colors.primarySoft : "#FFFFFF",
                opacity: pressed ? 0.92 : 1,
              })}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
            >
              <WifiHigh
                size={22}
                color={active ? colors.primary : colors.muted}
                weight="fill"
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 15,
                    fontWeight: active ? "700" : "600",
                  }}
                >
                  {n.ssid}
                </Text>
                {n.connected ? (
                  <Text
                    style={{
                      color: "#166534",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Conectado
                  </Text>
                ) : (
                  <Text style={{ color: colors.muted, fontSize: 12 }}>
                    Señal {n.strength}/4
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      <Button
        label="Añadir red manual"
        variant="secondary"
        size="md"
        fullWidth
        leftIcon={<Plus size={16} color={colors.primary} weight="bold" />}
        onPress={() => router.push("/config/wifi-manual" as never)}
      />
    </SimpleScreen>
  );
}
