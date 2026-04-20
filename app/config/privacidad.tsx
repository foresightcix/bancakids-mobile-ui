import { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ShieldCheck, Warning } from "phosphor-react-native";
import { SimpleScreen } from "@/components/SimpleScreen";
import { SwitchRow } from "@/components/SwitchRow";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/BottomSheet";
import { SuccessToast } from "@/components/states";
import { useSession } from "@/store/session";
import { colors } from "@/theme/tokens";

export default function PrivacidadScreen() {
  const router = useRouter();
  const logout = useSession((s) => s.logout);
  const [shareAnon, setShareAnon] = useState(true);
  const [improveAI, setImproveAI] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onDownload = async () => {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setDownloading(false);
    setToast("Te enviaremos tus datos al correo en 24h");
  };

  const onConfirmDelete = async () => {
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDeleting(false);
    setShowDelete(false);
    logout();
    router.replace("/");
  };

  return (
    <SimpleScreen
      title="Privacidad y datos"
      subtitle="Decide qué información queremos compartir"
    >
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          backgroundColor: "#EDE9FE",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <ShieldCheck size={28} color="#6C5CE7" weight="fill" />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#4C1D95",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Los datos de Sofi están protegidos
          </Text>
          <Text
            style={{
              color: "#5B21B6",
              fontSize: 12,
              marginTop: 2,
              lineHeight: 16,
            }}
          >
            Nunca compartimos su información con terceros sin tu consentimiento.
          </Text>
        </View>
      </View>

      <SwitchRow
        label="Compartir datos anónimos"
        description="Ayuda a mejorar la app sin identificar a tu hijo."
        value={shareAnon}
        onValueChange={setShareAnon}
      />

      <SwitchRow
        label="Mejorar IA con conversaciones"
        description="Procesamos frases anónimas para entrenar modelos."
        value={improveAI}
        onValueChange={setImproveAI}
      />

      <Button
        label={downloading ? "Generando..." : "Descargar mis datos"}
        variant="secondary"
        size="md"
        fullWidth
        loading={downloading}
        onPress={onDownload}
      />
      <Button
        label="Eliminar cuenta"
        variant="ghost"
        size="sm"
        fullWidth
        onPress={() => setShowDelete(true)}
      />

      <BottomSheet
        visible={showDelete}
        onClose={() => (deleting ? undefined : setShowDelete(false))}
        title="¿Eliminar cuenta?"
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            backgroundColor: "#FEE2E2",
            borderRadius: 11,
            padding: 12,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#FCA5A5",
          }}
        >
          <Warning size={20} color="#991B1B" weight="fill" />
          <Text
            style={{
              flex: 1,
              color: "#991B1B",
              fontSize: 13,
              lineHeight: 18,
              fontWeight: "500",
            }}
          >
            Perderás todos los datos de Sofi: misiones, metas, insights y
            movimientos. Esta acción no se puede deshacer.
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Button
            label="Cancelar"
            variant="secondary"
            size="md"
            fullWidth
            disabled={deleting}
            onPress={() => setShowDelete(false)}
          />
          <Button
            label={deleting ? "Eliminando..." : "Sí, eliminar cuenta"}
            variant="primary"
            size="md"
            fullWidth
            loading={deleting}
            onPress={onConfirmDelete}
          />
        </View>
      </BottomSheet>

      <SuccessToast
        visible={toast !== null}
        message={toast ?? ""}
        onClose={() => setToast(null)}
      />
    </SimpleScreen>
  );
}
