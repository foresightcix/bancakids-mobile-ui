import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#FFFFFF" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="flujo-cargar"
            options={{ presentation: "card", animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="celebrar"
            options={{ presentation: "card", animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="mision" />
          <Stack.Screen
            name="ejecutar-mision"
            options={{
              presentation: "card",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="meta" />
          <Stack.Screen name="capacidad" />
          <Stack.Screen name="insights" />
          <Stack.Screen name="config" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
