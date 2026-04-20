import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Bicycle,
  Coin,
  Star,
  Trophy,
  House,
  Gift,
  DotsThree,
  User,
  type IconProps,
} from "phosphor-react-native";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCargarFlow, motivoLabel, senderLabel } from "@/store/cargarFlow";
import { api } from "@/api";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";

const motivoIcon: Record<string, React.ComponentType<IconProps>> = {
  propina: Trophy,
  ayudo_casa: House,
  cumpleanos: Gift,
  comportamiento: Star,
  mesada: Coin,
  otro: DotsThree,
};

export default function ConfirmacionScreen() {
  const router = useRouter();
  const {
    amount,
    motivo,
    sender,
    otroSender,
    destino,
  } = useCargarFlow();
  const [loading, setLoading] = useState(false);

  const MotivoIcon = motivo ? motivoIcon[motivo] ?? Star : Star;

  const senderDisplay =
    sender === "otro" ? otroSender || "Otro" : sender ? senderLabel[sender] : "";

  const onConfirm = async () => {
    if (!amount || !motivo || !sender) return;
    setLoading(true);
    await api.cargarDinero(
      amount,
      motivoLabel[motivo],
      senderDisplay,
    );
    setLoading(false);
    router.replace("/flujo-cargar/celebracion" as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={4}
        totalSteps={4}
        title="Confirmar carga"
        subtitle="Revisa los detalles antes de continuar"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 24,
            paddingVertical: 28,
            paddingHorizontal: 20,
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            Monto a cargar
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 40,
              fontWeight: "700",
            }}
          >
            {formatCurrency(amount ?? 0)}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Coin size={16} color={colors.primary} weight="fill" />
            <Text
              style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}
            >
              Para la alcancía de Sofi
            </Text>
          </View>
        </View>

        <View
          style={{
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#EEF2F7",
            overflow: "hidden",
          }}
        >
          <DetailRow
            label="Motivo"
            value={motivo ? motivoLabel[motivo] : ""}
            Icon={MotivoIcon}
            iconColor="#F59E0B"
          />
          <View style={{ height: 1, backgroundColor: "#EEF2F7" }} />
          <DetailRow
            label="Quién envía"
            value={senderDisplay}
            Icon={User}
            iconColor={colors.primary}
          />
          <View style={{ height: 1, backgroundColor: "#EEF2F7" }} />
          <DetailRow
            label="Destino"
            value={destino}
            Icon={Bicycle}
            iconColor={colors.primary}
          />
        </View>
      </ScrollView>
      <FlowFooter
        label={loading ? "Procesando..." : "Confirmar carga"}
        onPress={onConfirm}
        loading={loading}
      />
    </View>
  );
}

function DetailRow({
  label,
  value,
  Icon,
  iconColor,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<IconProps>;
  iconColor: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={{ gap: 2 }}>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
        <Text
          style={{ color: colors.textPrimary, fontSize: 15, fontWeight: "600" }}
        >
          {value}
        </Text>
      </View>
      <Icon size={20} color={iconColor} weight="fill" />
    </View>
  );
}
