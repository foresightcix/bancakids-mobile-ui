import { View, Text, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { House, Coin, Book, ChartLineUp } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

type TabKey = "index" | "cargar" | "ensenar" | "monitorear";

interface TabDef {
  key: TabKey;
  label: string;
  href: string;
  Icon: typeof House;
  matches: (pathname: string) => boolean;
}

const TABS: TabDef[] = [
  {
    key: "index",
    label: "Inicio",
    href: "/",
    Icon: House,
    matches: (p) => p === "/" || p === "",
  },
  {
    key: "cargar",
    label: "Cargar",
    href: "/cargar",
    Icon: Coin,
    matches: (p) => p === "/cargar",
  },
  {
    key: "ensenar",
    label: "Enseñar",
    href: "/ensenar",
    Icon: Book,
    matches: (p) => p === "/ensenar",
  },
  {
    key: "monitorear",
    label: "Monitorear",
    href: "/monitorear",
    Icon: ChartLineUp,
    matches: (p) => p === "/monitorear",
  },
];

interface Props {
  /** Tab activo forzado (útil en rutas anidadas fuera de /(tabs)) */
  activeKey?: TabKey;
  /** "solid": fondo azul en el tab activo (Monitorear style). */
  variant?: "transparent" | "solid";
}

export function BottomTabBar({ activeKey, variant = "transparent" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: colors.surface,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderRadius: 24,
          backgroundColor: colors.primarySoft,
          height: 68,
          paddingHorizontal: 8,
          paddingVertical: 6,
          gap: 6,
        }}
      >
        {TABS.map((tab) => {
          const active = activeKey ? activeKey === tab.key : tab.matches(pathname);
          const activeBg = variant === "solid" ? colors.primary : "#FFFFFF";
          const iconColor = active
            ? variant === "solid"
              ? "#FFFFFF"
              : colors.primary
            : colors.muted;
          const labelColor = active
            ? variant === "solid"
              ? "#FFFFFF"
              : colors.primary
            : colors.textSecondary;

          return (
            <Pressable
              key={tab.key}
              onPress={() => router.push(tab.href as never)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tab.label}
              style={({ pressed }) => ({
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                backgroundColor: active ? activeBg : "transparent",
                opacity: pressed ? 0.75 : 1,
              })}
            >
              <tab.Icon
                size={18}
                color={iconColor}
                weight={active ? "fill" : "regular"}
              />
              <Text
                style={{
                  color: labelColor,
                  fontSize: 11,
                  fontWeight: active ? "700" : "600",
                  letterSpacing: 0.2,
                  lineHeight: 13.2,
                  marginTop: 4,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
