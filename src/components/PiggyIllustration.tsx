import { Image, View } from "react-native";

const PIGGY = require("../../assets/images/piggy.png");

interface Props {
  size?: number;
  /** Override tint para celebraciones (blanco sobre gradient). */
  tintColor?: string;
}

/**
 * Alcancía oficial de madera (BancaKids). El PNG del diseño .pen está en
 * ./assets/images/piggy.png — 500×500 con alpha.
 */
export function PiggyIllustration({ size = 158, tintColor }: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={PIGGY}
        resizeMode="contain"
        accessibilityLabel="Alcancía BancaKids"
        style={{
          width: size,
          height: size,
          tintColor,
        }}
      />
    </View>
  );
}
