import { ScrollView, Text, View } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { HeroPig } from "@/components/HeroPig";
import { CelebrateButton } from "@/components/CelebrateButton";
import { ProductoDestacadoCard } from "@/components/ProductoDestacadoCard";
import { ReleaseNoteCard } from "@/components/ReleaseNoteCard";
import { BottomTabBar } from "@/components/BottomTabBar";
import { LoadingSkeleton, ErrorState, OfflineBanner } from "@/components/states";
import { api } from "@/api";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { colors } from "@/theme/tokens";

export default function HomeScreen() {
  const { data, status, reload } = useAsyncResource(
    () =>
      Promise.all([api.getChild(), api.getMissions()]).then(
        ([child, missions]) => ({
          child,
          pendingMission:
            missions.find((m) => m.status === "in_progress") ?? null,
        }),
      ),
    [],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <OfflineBanner />
      <AppHeader variant="home" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 22,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 40,
            fontWeight: "700",
            lineHeight: 48,
          }}
        >
          Hola
        </Text>

        <CelebrateButton />

        {status === "loading" || status === "idle" ? (
          <LoadingSkeleton variant="hero" rows={2} />
        ) : status === "error" ? (
          <ErrorState onRetry={reload} />
        ) : (
          <>
            <HeroPig balance={data?.child.balance ?? 0} />
            <View style={{ gap: 16, paddingBottom: 14 }}>
              <ProductoDestacadoCard />
              {data?.pendingMission ? (
                <ReleaseNoteCard
                  title={data.pendingMission.title}
                  progress={data.pendingMission.progress}
                  description="Sigue los pasos sugeridos la próxima vez que acompañes a Sofi."
                  missionId={data.pendingMission.id}
                />
              ) : null}
            </View>
          </>
        )}
      </ScrollView>
      <BottomTabBar activeKey="index" />
    </View>
  );
}
