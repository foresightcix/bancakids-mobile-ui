import { View } from "react-native";
import { useRouter } from "expo-router";
import { Bell, Question, Gear } from "phosphor-react-native";
import { IconCircle } from "./ui/IconCircle";
import { Logo } from "./ui/Logo";

interface Props {
  variant?: "home" | "secondary";
}

/**
 * Header replicando el patrón del .pen: Logo del banco + 2 íconos circulares.
 */
export function AppHeader({ variant = "home" }: Props) {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <Logo />
      <View style={{ flexDirection: "row", gap: 10 }}>
        {variant === "home" ? (
          <>
            <IconCircle onPress={() => router.push("/insights" as never)}>
              <Bell size={18} color="#3E3E3E" />
            </IconCircle>
            <IconCircle onPress={() => router.push("/config" as never)}>
              <Gear size={18} color="#3E3E3E" />
            </IconCircle>
          </>
        ) : (
          <>
            <IconCircle onPress={() => router.push("/config/ayuda" as never)}>
              <Question size={18} color="#3E3E3E" />
            </IconCircle>
            <IconCircle onPress={() => router.push("/config" as never)}>
              <Gear size={18} color="#3E3E3E" />
            </IconCircle>
          </>
        )}
      </View>
    </View>
  );
}
