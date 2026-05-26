import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  ChatCircleDots,
  House,
  Info,
  MapPin,
  Park,
  Play,
  ShoppingCart,
  Sparkle,
  Storefront,
  Target,
  GraduationCap,
  Waveform,
  WifiHigh,
  type IconProps,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { api, getEscenario } from "@/api";
import { useMissionAttempts } from "@/store/missionAttempts";
import { BottomTabBar } from "@/components/BottomTabBar";
import type { Mission } from "@/types";
import { colors } from "@/theme/tokens";

type Phase = "preview" | "listening" | "processing";

type UbicacionKey = "casa" | "supermercado" | "parque" | "escuela" | "tienda";

const UBICACIONES: {
  key: UbicacionKey;
  label: string;
  Icon: React.ComponentType<IconProps>;
}[] = [
  { key: "casa", label: "Casa", Icon: House },
  { key: "supermercado", label: "Supermercado", Icon: ShoppingCart },
  { key: "parque", label: "Parque", Icon: Park },
  { key: "escuela", label: "Escuela", Icon: GraduationCap },
  { key: "tienda", label: "Tienda", Icon: Storefront },
];

const UBICACION_LABEL: Record<UbicacionKey, string> = {
  casa: "Casa",
  supermercado: "Supermercado",
  parque: "Parque",
  escuela: "Escuela",
  tienda: "Tienda del barrio",
};

export default function PracticaIA() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [phase, setPhase] = useState<Phase>("preview");
  const [ubicacion, setUbicacion] = useState<UbicacionKey | null>(null);

  const getCount = useMissionAttempts((s) => s.getCount);
  const getNextEscenarioIndex = useMissionAttempts(
    (s) => s.getNextEscenarioIndex,
  );
  const recordAttempt = useMissionAttempts((s) => s.recordAttempt);

  const nextAttempt = getCount(id ?? "") + 1;
  const escenarioIndex = getNextEscenarioIndex(id ?? "");
  const escenario = useMemo(
    () => (id ? getEscenario(id, escenarioIndex) : null),
    [id, escenarioIndex],
  );

  useEffect(() => {
    if (id) {
      api
        .getMissions()
        .then((ms) => setMission(ms.find((m) => m.id === id) ?? null));
    }
  }, [id]);

  const onStart = async () => {
    if (!ubicacion) return;
    setPhase("listening");
    // Sofi interactúa con la alcancía IoT (simulación)
    await new Promise((r) => setTimeout(r, 3000));
    setPhase("processing");
    await new Promise((r) => setTimeout(r, 1200));
    recordAttempt(id ?? "", "escenario");
    router.replace(`/ejecutar-mision/${id}/insight` as never);
  };

  if (phase !== "preview") {
    return (
      <ListeningView
        phase={phase}
        escenarioType={escenario?.type ?? "dilema"}
        attempt={nextAttempt}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 4,
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
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 4,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Misión
          </Text>
        </Pressable>
        <View
          style={{
            backgroundColor: "#FFF3E0",
            borderRadius: 100,
            paddingVertical: 4,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ color: "#92400E", fontSize: 12, fontWeight: "700" }}>
            Intento #{nextAttempt}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 16,
          gap: 14,
        }}
      >
        <LinearGradient
          colors={["#E1EEFB", "#C8F0D8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: 88,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Sparkle size={36} color={colors.accent} weight="fill" />
          <Text style={{ color: colors.accent, fontSize: 14, fontWeight: "700" }}>
            Escenario #{escenarioIndex + 1} generado por IA
          </Text>
        </LinearGradient>

        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Escenario de práctica
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Sofi practicará sola con la alcancía
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: colors.primarySoft,
              borderRadius: 100,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
          >
            <Target size={14} color={colors.primary} weight="fill" />
            <Text
              style={{
                color: colors.primary,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Competencia: {mission?.title ?? "Valor del dinero"}
            </Text>
          </View>
        </View>

        {/* Ubicación selector */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1.5,
            borderColor: ubicacion ? colors.primary : "#EEF2F7",
            borderRadius: 14,
            padding: 14,
            gap: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <MapPin size={18} color={colors.primary} weight="fill" />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                ¿Dónde practicará Sofi?
              </Text>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                Elige una ubicación para ambientar el escenario.
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
            style={{ flexGrow: 0 }}
          >
            {UBICACIONES.map(({ key, label, Icon }) => {
              const selected = ubicacion === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setUbicacion(key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`Ubicación ${label}`}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: selected
                      ? colors.primary
                      : colors.primarySoft,
                    borderRadius: 100,
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Icon
                    size={16}
                    color={selected ? "#FFFFFF" : colors.primary}
                    weight="fill"
                  />
                  <Text
                    style={{
                      color: selected ? "#FFFFFF" : colors.primary,
                      fontSize: 13,
                      fontWeight: selected ? "700" : "600",
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: "#FFF3E0",
            borderRadius: 14,
            padding: 14,
            gap: 10,
          }}
        >
          <Text style={{ color: "#92400E", fontSize: 14, fontWeight: "700" }}>
            ¿Cómo funciona este intento?
          </Text>
          {[
            "La alcancía le presenta el escenario a Sofi en voz alta",
            "Sofi le habla a la alcancía para responder (tú no participas)",
            "Al terminar, aparecerá un insight automático aquí",
          ].map((step, i) => (
            <View
              key={i}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: colors.accent,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  color: "#92400E",
                  fontSize: 12,
                  fontWeight: "500",
                  lineHeight: 17,
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: colors.neutral200,
            borderRadius: 14,
            padding: 14,
            gap: 10,
          }}
        >
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
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Vista previa del escenario
            </Text>
            <View
              style={{
                backgroundColor: "#FFF3E0",
                borderRadius: 100,
                paddingVertical: 3,
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  color: "#92400E",
                  fontSize: 11,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                Tipo: {escenario?.type ?? "dilema"}
              </Text>
            </View>
          </View>

          {ubicacion ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                alignSelf: "flex-start",
                backgroundColor: colors.primarySoft,
                borderRadius: 100,
                paddingVertical: 4,
                paddingHorizontal: 10,
              }}
            >
              <MapPin size={12} color={colors.primary} weight="fill" />
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                Ambientado en: {UBICACION_LABEL[ubicacion]}
              </Text>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "#F9FAFB",
              borderRadius: 11,
              padding: 12,
              alignItems: "flex-start",
            }}
          >
            <ChatCircleDots size={18} color={colors.accent} weight="fill" />
            <Text
              style={{
                flex: 1,
                color: colors.textTertiary,
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 20,
              }}
            >
              {escenario?.situation ?? "Cargando escenario..."}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Info size={14} color={colors.placeholder} weight="fill" />
            <Text
              style={{
                flex: 1,
                color: colors.placeholder,
                fontSize: 11,
                lineHeight: 16,
              }}
            >
              Este escenario rota entre 3 variantes en cada intento para evitar
              memorización.
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#E8F5E9",
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <WifiHigh size={16} color="#2E7D32" weight="fill" />
          <Text style={{ color: "#2E7D32", fontSize: 13, fontWeight: "600" }}>
            Alcancía conectada y lista
          </Text>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}>
        <Button
          label={
            ubicacion
              ? "Enviar escenario a la alcancía"
              : "Selecciona una ubicación"
          }
          variant="primary"
          size="md"
          fullWidth
          disabled={!ubicacion}
          leftIcon={<Play size={18} color="#FFFFFF" weight="fill" />}
          onPress={onStart}
        />
        <Button
          label="Volver al progreso"
          variant="secondary"
          size="sm"
          fullWidth
          onPress={() => router.back()}
        />
      </View>

      <BottomTabBar activeKey="ensenar" />
    </View>
  );
}

function ListeningView({
  phase,
  escenarioType,
  attempt,
}: {
  phase: Phase;
  escenarioType: string;
  attempt: number;
}) {
  const pulse = useAnimatedPulse(phase === "listening");
  const label =
    phase === "listening" ? "Sofi está conversando..." : "Procesando insight...";
  const sub =
    phase === "listening"
      ? "Escucha desde la alcancía. No interrumpas."
      : "Estamos analizando la respuesta de Sofi...";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF3E0",
          borderRadius: 100,
          paddingVertical: 4,
          paddingHorizontal: 12,
        }}
      >
        <Text style={{ color: "#92400E", fontSize: 12, fontWeight: "700" }}>
          Intento #{attempt} · escenario {escenarioType}
        </Text>
      </View>

      <Animated.View
        style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: colors.primarySoft,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: pulse }],
        }}
      >
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Waveform size={48} color={colors.primary} weight="fill" />
        </View>
      </Animated.View>

      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 20,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          lineHeight: 20,
          textAlign: "center",
          maxWidth: 280,
        }}
      >
        {sub}
      </Text>
    </View>
  );
}

function useAnimatedPulse(active: boolean) {
  const value = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!active) {
      value.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1.15,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, value]);
  return value;
}
