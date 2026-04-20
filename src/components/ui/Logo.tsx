import { Image, View } from "react-native";

const BCP_LOGO = require("../../../assets/images/bcp-logo.png");

interface Props {
  height?: number;
}

/**
 * Logo oficial del BCP (imagen del .pen). El .pen original lo usa a 60×15 en
 * los headers. Preservamos aspect ratio automáticamente con width:"auto".
 */
export function Logo({ height = 18 }: Props) {
  return (
    <View
      style={{
        height,
        aspectRatio: 3840 / 968,
        justifyContent: "center",
      }}
    >
      <Image
        source={BCP_LOGO}
        resizeMode="contain"
        accessibilityLabel="BCP"
        style={{
          height,
          width: "100%",
        }}
      />
    </View>
  );
}
