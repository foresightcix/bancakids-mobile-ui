import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { AppHeader } from "./AppHeader";
import { colors } from "@/theme/tokens";

interface Props {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function FlowHeader({
  step,
  totalSteps,
  title,
  subtitle,
  showBack = true,
  onBack,
}: Props) {
  const router = useRouter();
  return (
    <>
      <AppHeader variant="secondary" />
      <View style={{ paddingHorizontal: 20, paddingTop: 8, gap: 6 }}>
        {showBack ? (
          <Pressable
            onPress={() => (onBack ? onBack() : router.back())}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Regresar"
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              opacity: pressed ? 0.6 : 1,
              alignSelf: "flex-start",
              paddingVertical: 4,
            })}
          >
            <ArrowLeft size={20} color={colors.textHeading} weight="bold" />
          </Pressable>
        ) : null}
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          {step} de {totalSteps}
        </Text>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "500",
              lineHeight: 20,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </>
  );
}
