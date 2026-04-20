import { Text, View } from "react-native";
import { BatteryMedium, Lightning } from "phosphor-react-native";
import { SimpleScreen } from "@/components/SimpleScreen";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { colors } from "@/theme/tokens";

export default function BateriaScreen() {
  return (
    <SimpleScreen title="Batería y energía" subtitle="Estado actual de la alcancía de Sofi">
      <View
        style={{
          backgroundColor: "#DCFCE7",
          borderRadius: 20,
          padding: 20,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <BatteryMedium size={28} color="#16A34A" weight="fill" />
          <Text
            style={{ color: "#166534", fontSize: 36, fontWeight: "700" }}
          >
            78%
          </Text>
        </View>
        <ProgressBar
          progress={78}
          height={10}
          trackColor="#BBF7D0"
          fillColor="#16A34A"
          radius={5}
        />
        <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
          ~14 horas de uso restantes con volumen medio
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#FEF3C7",
          borderRadius: 14,
          padding: 14,
          alignItems: "center",
        }}
      >
        <Lightning size={20} color="#B45309" weight="fill" />
        <Text
          style={{
            flex: 1,
            color: colors.textPrimary,
            fontSize: 13,
            lineHeight: 18,
          }}
        >
          Carga la alcancía al menos 1 hora antes de dormir para que esté lista
          mañana.
        </Text>
      </View>
    </SimpleScreen>
  );
}
