import {
  Modal,
  Pressable,
  View,
  Text,
  ViewStyle,
} from "react-native";
import { X } from "phosphor-react-native";
import { colors } from "@/theme/tokens";

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

/**
 * Bottom Sheet modal simple y autocontenido. Oculta/muestra via useState.
 */
export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  contentStyle,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "#00000066",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => ({
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingTop: 12,
            paddingBottom: 32,
            paddingHorizontal: 24,
            ...contentStyle,
            opacity: pressed ? 1 : 1,
          })}
        >
          <View
            style={{
              alignSelf: "center",
              width: 48,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.neutral200,
              marginBottom: 16,
            }}
          />
          {title ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {title}
              </Text>
              <Pressable
                onPress={onClose}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel="Cerrar"
              >
                <X size={22} color={colors.textSecondary} />
              </Pressable>
            </View>
          ) : null}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
