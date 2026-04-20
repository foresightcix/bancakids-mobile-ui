import { ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { useCelebrarFlow } from "@/store/celebrarFlow";
import { colors } from "@/theme/tokens";

const MAX = 200;

export default function ModoMensajeScreen() {
  const router = useRouter();
  const { mensaje, setMensaje } = useCelebrarFlow();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader
        step={3}
        totalSteps={3}
        title="Escribe un mensaje"
        subtitle="Sofi lo escuchará cuando abra la alcancía"
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.neutral200,
            padding: 16,
            minHeight: 180,
          }}
        >
          <TextInput
            value={mensaje}
            onChangeText={(t) => t.length <= MAX && setMensaje(t)}
            placeholder="Ej. Estoy muy orgulloso de cómo lograste ahorrar para tu bici…"
            placeholderTextColor={colors.placeholder}
            multiline
            autoFocus
            style={{
              fontSize: 15,
              color: colors.textPrimary,
              textAlignVertical: "top",
              minHeight: 160,
            }}
          />
        </View>
        <Text
          style={{
            alignSelf: "flex-end",
            color: colors.muted,
            fontSize: 12,
          }}
        >
          {mensaje.length}/{MAX}
        </Text>
      </ScrollView>
      <FlowFooter
        label="Enviar mensaje"
        onPress={() => router.push("/celebrar/exito" as never)}
        disabled={!mensaje.trim()}
      />
    </View>
  );
}
