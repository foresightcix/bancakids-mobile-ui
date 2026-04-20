import { Text, View } from "react-native";
import {
  Coin,
  Cake,
  Gift,
  Trophy,
  type IconProps,
} from "phosphor-react-native";
import { colors } from "@/theme/tokens";
import type { Transaction } from "@/types";
import { formatCurrency, formatRelativeDate } from "@/utils/format";

const byMotivo: Record<
  string,
  { Icon: React.ComponentType<IconProps>; bg: string; color: string }
> = {
  mesada: { Icon: Coin, bg: colors.primarySoft, color: colors.primary },
  domingo: { Icon: Coin, bg: colors.primarySoft, color: colors.primary },
  celebracion: { Icon: Cake, bg: "#FCE7F3", color: "#DB2777" },
  regalo: { Icon: Gift, bg: "#FFF3E0", color: colors.accent },
  logro: { Icon: Trophy, bg: "#FEF3C7", color: "#B45309" },
};

interface Props {
  tx: Transaction;
}

export function TransactionRow({ tx }: Props) {
  const motivo = tx.motivo ?? "mesada";
  const cfg = byMotivo[motivo] ?? byMotivo.mesada;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 12,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: cfg.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <cfg.Icon size={20} color={cfg.color} weight="fill" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{ color: colors.textPrimary, fontSize: 14, fontWeight: "600" }}
          numberOfLines={1}
        >
          {tx.concept}
        </Text>
        <Text style={{ color: colors.muted, fontSize: 12 }} numberOfLines={1}>
          {tx.sender ?? "Invitado"} · {formatRelativeDate(tx.date)}
        </Text>
      </View>
      <Text
        style={{
          color: "#2E7D32",
          fontSize: 15,
          fontWeight: "700",
        }}
      >
        +{formatCurrency(tx.amount)}
      </Text>
    </View>
  );
}
