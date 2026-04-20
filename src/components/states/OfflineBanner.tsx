import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { WifiSlash } from "phosphor-react-native";

/**
 * Offline Banner (hvS6j del .pen) — bg #FEF3C7 border #FCD34D.
 * En web usa navigator.onLine + eventos online/offline. En mobile sería
 * NetInfo, pero para el demo con web priorizamos navigator.
 */
export function OfflineBanner() {
  const [online, setOnline] = useState<boolean>(() => {
    if (Platform.OS === "web" && typeof navigator !== "undefined") {
      return navigator.onLine;
    }
    return true;
  });

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <View
      style={{
        backgroundColor: "#FEF3C7",
        borderBottomWidth: 1,
        borderBottomColor: "#FCD34D",
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <WifiSlash size={18} color="#D97706" weight="fill" />
      <Text style={{ color: "#92400E", fontSize: 13, fontWeight: "600" }}>
        Sin conexión a internet
      </Text>
    </View>
  );
}
