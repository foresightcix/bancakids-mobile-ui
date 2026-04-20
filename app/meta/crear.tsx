import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Target } from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { colors } from "@/theme/tokens";

interface FormData {
  title: string;
  amount: string;
}

export default function CrearMeta() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { title: "", amount: "" },
    mode: "onChange",
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AppHeader variant="secondary" />
      <View style={{ paddingHorizontal: 20, paddingTop: 4 }}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 4,
            alignSelf: "flex-start",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={20} color={colors.textHeading} weight="bold" />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 24,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: 4 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Nueva meta
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            ¿Qué quiere ahorrar Sofi esta vez?
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Nombre de la meta
          </Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Escribe un nombre", minLength: 3 }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej. Bici nueva"
                placeholderTextColor={colors.placeholder}
                style={{
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: errors.title ? "#DC2626" : colors.neutral200,
                  padding: 14,
                  fontSize: 15,
                  color: colors.textPrimary,
                }}
              />
            )}
          />
          {errors.title ? (
            <Text style={{ color: "#DC2626", fontSize: 12 }}>
              {errors.title.message as string}
            </Text>
          ) : null}
        </View>

        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Monto objetivo
          </Text>
          <Controller
            control={control}
            name="amount"
            rules={{
              required: "Ingresa un monto",
              validate: (v) => {
                const n = parseFloat(v);
                if (isNaN(n) || n <= 0) return "Monto inválido";
                return true;
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <View
                style={{
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: errors.amount ? "#DC2626" : colors.neutral200,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Target size={20} color={colors.accent} weight="fill" />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  S/.
                </Text>
                <TextInput
                  value={value}
                  onChangeText={(t) => onChange(t.replace(",", "."))}
                  onBlur={onBlur}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: colors.textPrimary,
                    padding: 0,
                  }}
                />
              </View>
            )}
          />
          {errors.amount ? (
            <Text style={{ color: "#DC2626", fontSize: 12 }}>
              {errors.amount.message as string}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Button
          label={loading ? "Creando..." : "Crear meta"}
          variant="primary"
          size="md"
          fullWidth
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
