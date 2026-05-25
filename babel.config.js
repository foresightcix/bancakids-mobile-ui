module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    // Reanimated 4 (SDK 54+) usa el plugin de worklets oficial.
    // Debe ir al final del array de plugins.
    plugins: ["react-native-worklets/plugin"],
  };
};
