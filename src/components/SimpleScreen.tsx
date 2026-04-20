import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Header + back + scroll container reusable para sub-pantallas de Config.
 */
export function SimpleScreen({ title, subtitle, children }: Props) {
  const router = useRouter();
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
          accessibilityRole="button"
          accessibilityLabel="Volver"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
        </Pressable>
        <Text
          style={{ color: colors.textPrimary, fontSize: 20, fontWeight: "700" }}
        >
          {title}
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        {subtitle ? (
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
        {children}
      </ScrollView>
    </View>
  );
}
