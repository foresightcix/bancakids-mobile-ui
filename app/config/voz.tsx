import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SpeakerHigh, SpeakerLow, SpeakerNone } from "phosphor-react-native";
import { SimpleScreen } from "@/components/SimpleScreen";
import { SwitchRow } from "@/components/SwitchRow";
import { colors } from "@/theme/tokens";

type Volumen = "mute" | "bajo" | "medio" | "alto";

export default function VozScreen() {
  const [vol, setVol] = useState<Volumen>("medio");
  const [voiceOn, setVoiceOn] = useState(true);
  const [effects, setEffects] = useState(true);

  const OPTS: {
    key: Volumen;
    label: string;
    Icon: typeof SpeakerHigh;
  }[] = [
    { key: "mute", label: "Silencio", Icon: SpeakerNone },
    { key: "bajo", label: "Bajo", Icon: SpeakerLow },
    { key: "medio", label: "Medio", Icon: SpeakerLow },
    { key: "alto", label: "Alto", Icon: SpeakerHigh },
  ];

  return (
    <SimpleScreen title="Voz y sonido" subtitle="Controla cómo suena la alcancía">
      <View style={{ flexDirection: "row", gap: 8 }}>
        {OPTS.map(({ key, label, Icon }) => {
          const active = vol === key;
          return (
            <Pressable
              key={key}
              onPress={() => setVol(key)}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: active ? colors.primary : "#FFFFFF",
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.neutral200,
                borderRadius: 14,
                padding: 14,
                alignItems: "center",
                gap: 6,
                opacity: pressed ? 0.85 : 1,
              })}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Icon
                size={22}
                color={active ? "#FFFFFF" : colors.primary}
                weight="fill"
              />
              <Text
                style={{
                  color: active ? "#FFFFFF" : colors.textPrimary,
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ gap: 10 }}>
        <SwitchRow
          value={voiceOn}
          onValueChange={setVoiceOn}
          label="Voz de la alcancía"
          description="Sofi escucha mensajes y pequeños consejos."
        />
        <SwitchRow
          value={effects}
          onValueChange={setEffects}
          label="Efectos de monedas"
          description="Suena una moneda al cargar dinero."
        />
      </View>
    </SimpleScreen>
  );
}
