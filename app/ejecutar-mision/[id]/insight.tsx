import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Bell, Gear, Sparkle } from "phosphor-react-native";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { api } from "@/api";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

export default function InsightGenerado() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);

  useEffect(() => {
    api.getMissions().then((ms) => setMission(ms.find((m) => m.id === id) ?? null));
  }, [id]);

  const now = new Date().toLocaleString("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          height: 56,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
        </Pressable>
        <Logo />
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Bell size={22} color={colors.textHeading} />
          <Gear size={22} color={colors.textHeading} />
        </View>
      </View>

      <LinearGradient
        colors={["#E1EEFB", "#C8F0D8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          height: 140,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Sparkle size={52} color={colors.accent} weight="fill" />
        <Text
          style={{ color: colors.textHeading, fontSize: 24, fontWeight: "700" }}
        >
          ¡Insight generado!
        </Text>
        <Text
          style={{
            color: colors.textTertiary,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {mission?.title ?? "La alcancía mágica"}
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.neutral200,
            padding: 20,
            gap: 14,
          }}
        >
          <Text
            style={{
              color: colors.textHeading,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Resumen del insight
          </Text>
          <Text
            style={{
              color: colors.textTertiary,
              fontSize: 14,
              lineHeight: 21,
            }}
          >
            Sofi demostró entender el concepto de ahorro al crear metas
            visuales. Identificó que ahorrar sirve para cumplir sueños.
          </Text>
          <View style={{ height: 1, backgroundColor: colors.neutral200 }} />
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#2E7D32",
              }}
            />
            <Text
              style={{
                color: colors.textTertiary,
                fontSize: 13,
                flex: 1,
              }}
            >
              Indicador: Reconoce el valor del ahorro
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: colors.textTertiary, fontSize: 13 }}>
              Estado:
            </Text>
            <View
              style={{
                backgroundColor: "#C8F0D8",
                borderRadius: 20,
                paddingVertical: 4,
                paddingHorizontal: 12,
              }}
            >
              <Text
                style={{ color: "#2E7D32", fontSize: 11, fontWeight: "700" }}
              >
                Verde
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: colors.placeholder,
              fontSize: 12,
            }}
          >
            {now}
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12, gap: 12 }}>
        <Pressable
          onPress={() => router.replace(`/ejecutar-mision/${id}/completada` as never)}
          accessibilityRole="button"
          style={({ pressed }) => ({
            backgroundColor: "#2E7D32",
            height: 50,
            borderRadius: 11,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.88 : 1,
          })}
        >
          <Text
            style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}
          >
            Finalizar misión ✓
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace(`/ejecutar-mision/${id}/redo` as never)}
          accessibilityRole="button"
          accessibilityLabel="Volver a realizar misión"
          style={({ pressed }) => ({
            height: 50,
            borderRadius: 11,
            borderWidth: 1.5,
            borderColor: "#2E7D32",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{ color: "#2E7D32", fontSize: 16, fontWeight: "500" }}
          >
            Volver a realizar misión
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
