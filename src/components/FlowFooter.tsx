import { View } from "react-native";
import { Button } from "./ui/Button";

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function FlowFooter({ label, onPress, loading, disabled }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Button
        label={label}
        onPress={onPress}
        loading={loading}
        disabled={disabled}
        variant="primary"
        size="md"
        fullWidth
      />
    </View>
  );
}
