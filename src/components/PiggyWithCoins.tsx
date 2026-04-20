import { View, Text } from "react-native";
import { Sparkle } from "phosphor-react-native";
import { PiggyIllustration } from "./PiggyIllustration";
import { colors } from "@/theme/tokens";

/**
 * "Piggy Area" 280×220 del .pen (nodos JDDFm/NIUzu/AxaVf/Kw88W).
 * Piggy centrado + monedas flotantes doradas + sparkles + confetti dots.
 * Usado en Cargar 5 - Celebración y Celebrar 4 (Cargar/Experiencia/Mensaje).
 */
export function PiggyWithCoins() {
  return (
    <View style={{ width: 280, height: 220 }}>
      {/* Confetti dots */}
      <View
        style={{
          position: "absolute",
          left: 20,
          top: 30,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.primary,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 255,
          top: 45,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.accent,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 15,
          top: 100,
          width: 7,
          height: 7,
          borderRadius: 3.5,
          backgroundColor: "#F7D1E8",
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 260,
          top: 110,
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: "#FBBF24",
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 45,
          top: 160,
          width: 9,
          height: 9,
          borderRadius: 4.5,
          backgroundColor: colors.primarySoft,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 230,
          top: 170,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.primary,
        }}
      />

      {/* Sparkles */}
      <View style={{ position: "absolute", left: 60, top: 10 }}>
        <Sparkle size={20} color="#FBBF24" weight="fill" />
      </View>
      <View style={{ position: "absolute", left: 200, top: 25 }}>
        <Sparkle size={16} color={colors.primary} weight="fill" />
      </View>
      <View style={{ position: "absolute", left: 30, top: 60 }}>
        <Sparkle size={14} color={colors.accent} weight="fill" />
      </View>
      <View style={{ position: "absolute", left: 240, top: 70 }}>
        <Sparkle size={18} color="#FBBF24" weight="fill" />
      </View>

      {/* Gold coins */}
      <Coin x={130} y={0} size={32} fill="#F59E0B" stroke="#D97706" label="S/" labelSize={10} />
      <Coin x={155} y={15} size={26} fill="#FBBF24" stroke="#F59E0B" label="S/" labelSize={8} />
      <Coin x={110} y={8} size={22} fill="#FCD34D" stroke="#FBBF24" />
      <Coin x={90} y={20} size={18} fill="#FDE68A" stroke="#FBBF24" />
      <Coin x={170} y={5} size={24} fill="#F59E0B" stroke="#D97706" />

      {/* Piggy */}
      <View style={{ position: "absolute", left: 40, top: 30 }}>
        <PiggyIllustration size={200} />
      </View>
    </View>
  );
}

function Coin({
  x,
  y,
  size,
  fill,
  stroke,
  label,
  labelSize = 10,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  stroke: string;
  label?: string;
  labelSize?: number;
}) {
  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: fill,
        borderWidth: size >= 20 ? 2 : 1.5,
        borderColor: stroke,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label ? (
        <Text
          style={{
            color: "#92400E",
            fontSize: labelSize,
            fontWeight: "700",
          }}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
}
