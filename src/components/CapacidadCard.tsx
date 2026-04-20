import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  CaretRight,
  Coin,
  Scales,
  Wallet,
  HandHeart,
} from "phosphor-react-native";
import { ProgressBar } from "./ui/ProgressBar";
import { colors, shadows } from "@/theme/tokens";
import type { Competencia } from "@/types";

const iconMap = {
  coin: Coin,
  scales: Scales,
  wallet: Wallet,
  "hand-heart": HandHeart,
} as const;

interface Props {
  capacidad: Competencia;
}

export function CapacidadCard({ capacidad }: Props) {
  const router = useRouter();
  const Icon = iconMap[capacidad.icon as keyof typeof iconMap] ?? Coin;
  return (
    <Pressable
      onPress={() => router.push(`/capacidad/${capacidad.id}` as never)}
      accessibilityRole="button"
      accessibilityLabel={`Capacidad ${capacidad.name}`}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderRadius: 11,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.neutral250,
        gap: 8,
        opacity: pressed ? 0.92 : 1,
        ...shadows.card,
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          <Icon size={20} color={capacidad.color} weight="fill" />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: "600",
            }}
            numberOfLines={1}
          >
            {capacidad.name}
          </Text>
        </View>
        <Text
          style={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {capacidad.progress}%
        </Text>
        <CaretRight size={18} color={colors.placeholder} />
      </View>
      <ProgressBar
        progress={capacidad.progress}
        height={6}
        trackColor={colors.primarySoft}
        fillColor={colors.primary}
        radius={4}
      />
    </Pressable>
  );
}
