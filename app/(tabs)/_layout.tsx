import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Custom tab layout — el .pen define una "pill bar" específica
 * que no calza con el Tabs nativo de Expo Router. Cada tab render
 * su propia BottomTabBar para controlar el variant (transparent/solid).
 */
export default function TabsLayout() {
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-surface"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
