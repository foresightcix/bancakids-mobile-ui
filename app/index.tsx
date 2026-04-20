import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useSession } from "@/store/session";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { colors } from "@/theme/tokens";

export default function Index() {
  const { isAuthenticated } = useSession();
  const { hasCompleted, loading } = useOnboardingStatus();

  // Espera a que AsyncStorage se hidrate antes de decidir el redirect.
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!isAuthenticated) return <Redirect href="/(onboarding)/splash" />;
  if (!hasCompleted) return <Redirect href="/(onboarding)/datos-cuenta" />;
  return <Redirect href="/(tabs)" />;
}
