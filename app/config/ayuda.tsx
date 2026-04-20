import { Pressable, Text, View } from "react-native";
import {
  Book,
  ChatCircleDots,
  EnvelopeSimple,
  Phone,
  type IconProps,
} from "phosphor-react-native";
import { SimpleScreen } from "@/components/SimpleScreen";
import { colors } from "@/theme/tokens";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "¿Cómo cargo dinero en la alcancía?",
    a: "Entra al tab Cargar o al Home y toca 'Cargar dinero'. En 4 pasos rápidos cargas el monto con un motivo y un remitente.",
  },
  {
    q: "¿Qué pasa si Sofi aprieta el botón?",
    a: "La alcancía reacciona con un mensaje de voz según el contexto y guarda el evento en Monitorear.",
  },
  {
    q: "¿Cómo actualizo la red WiFi?",
    a: "Configuración → Red WiFi. Desde ahí puedes elegir una red existente o añadir una manual.",
  },
];

const CONTACTS: {
  Icon: React.ComponentType<IconProps>;
  label: string;
  value: string;
  color: string;
}[] = [
  {
    Icon: ChatCircleDots,
    label: "Chat en vivo",
    value: "Respuesta en ~2 min",
    color: colors.primary,
  },
  {
    Icon: EnvelopeSimple,
    label: "Correo",
    value: "soporte@bancakids.pe",
    color: colors.accent,
  },
  {
    Icon: Phone,
    label: "Llámanos",
    value: "(01) 311 9898",
    color: "#16A34A",
  },
];

export default function AyudaScreen() {
  return (
    <SimpleScreen
      title="Ayuda y soporte"
      subtitle="Estamos aquí para ayudarte con la alcancía y la app"
    >
      <View style={{ gap: 10 }}>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 0.6,
          }}
        >
          CONTACTO DIRECTO
        </Text>
        {CONTACTS.map(({ Icon, label, value, color }) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: color + "15",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={20} color={color} weight="fill" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {label}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>{value}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{ gap: 10, marginTop: 4 }}>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 0.6,
          }}
        >
          PREGUNTAS FRECUENTES
        </Text>
        {FAQS.map((f, i) => (
          <View
            key={i}
            style={{
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              padding: 14,
              gap: 6,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Book size={16} color={colors.primary} weight="fill" />
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                {f.q}
              </Text>
            </View>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                lineHeight: 18,
              }}
            >
              {f.a}
            </Text>
          </View>
        ))}
      </View>
    </SimpleScreen>
  );
}
