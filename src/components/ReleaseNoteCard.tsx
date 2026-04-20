import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ProgressBar } from "./ui/ProgressBar";
import { colors } from "@/theme/tokens";

interface Props {
  title: string;
  progress: number;
  description: string;
  badge?: string;
  missionId?: string;
}

/**
 * "Release Note Card" (`uOh5P`) — actividad pendiente con progreso.
 * Bg #FFFFFF, radius 28, padding 24, border #F0F0F0.
 */
export function ReleaseNoteCard({
  title,
  progress,
  description,
  badge = "ACTIVIDAD PENDIENTE",
  missionId,
}: Props) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        missionId
          ? router.push(`/mision/${missionId}` as never)
          : router.push("/ensenar" as never)
      }
      accessibilityRole="button"
      accessibilityLabel={`Actividad pendiente: ${title}`}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderRadius: 28,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.neutral250,
        gap: 16,
        opacity: pressed ? 0.95 : 1,
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
            backgroundColor: colors.accent,
            borderRadius: 11,
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            {badge}
          </Text>
        </View>
      </View>

      <Text
        style={{ color: colors.textPrimary, fontSize: 18, fontWeight: "700" }}
      >
        {title}
      </Text>

      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Progreso
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "700",
            }}
          >
            {progress}%
          </Text>
        </View>
        <ProgressBar
          progress={progress}
          height={10}
          trackColor={colors.neutral100}
          fillColor={colors.accent}
          radius={999}
        />
      </View>

      <View
        style={{
          backgroundColor: colors.accentSoft,
          borderRadius: 11,
          padding: 12,
        }}
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: "500",
            lineHeight: 17,
          }}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
}
