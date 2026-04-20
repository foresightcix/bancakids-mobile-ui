import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { SimpleScreen } from "@/components/SimpleScreen";
import { Button } from "@/components/ui/Button";
import { PiggyIllustration } from "@/components/PiggyIllustration";
import { api } from "@/api";
import { colors } from "@/theme/tokens";

interface FormData {
  name: string;
  age: string;
}

export default function PerfilScreen() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: { name: "", age: "" },
    mode: "onChange",
  });

  useEffect(() => {
    api.getChild().then((c) =>
      reset({ name: c.name, age: String(c.age) }),
    );
  }, [reset]);

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <SimpleScreen title="Perfil de Sofi">
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.primarySoft,
          borderRadius: 24,
          padding: 24,
          gap: 12,
        }}
      >
        <PiggyIllustration size={100} />
      </View>

      <View style={{ gap: 8 }}>
        <Text
          style={{ color: colors.textPrimary, fontSize: 13, fontWeight: "600" }}
        >
          Nombre
        </Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: "El nombre es obligatorio", minLength: 2 }}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nombre"
              placeholderTextColor={colors.placeholder}
              style={{
                borderRadius: 11,
                borderWidth: 1,
                borderColor: errors.name ? "#DC2626" : colors.neutral200,
                padding: 14,
                fontSize: 15,
                color: colors.textPrimary,
              }}
            />
          )}
        />
        {errors.name ? (
          <Text style={{ color: "#DC2626", fontSize: 12 }}>
            {errors.name.message as string}
          </Text>
        ) : null}
      </View>

      <View style={{ gap: 8 }}>
        <Text
          style={{ color: colors.textPrimary, fontSize: 13, fontWeight: "600" }}
        >
          Edad
        </Text>
        <Controller
          control={control}
          name="age"
          rules={{
            required: "Ingresa la edad",
            validate: (v) => {
              const n = parseInt(v, 10);
              if (isNaN(n) || n < 4 || n > 16)
                return "Edad debe estar entre 4 y 16";
              return true;
            },
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="number-pad"
              placeholder="Edad"
              placeholderTextColor={colors.placeholder}
              style={{
                borderRadius: 11,
                borderWidth: 1,
                borderColor: errors.age ? "#DC2626" : colors.neutral200,
                padding: 14,
                fontSize: 15,
                color: colors.textPrimary,
              }}
            />
          )}
        />
        {errors.age ? (
          <Text style={{ color: "#DC2626", fontSize: 12 }}>
            {errors.age.message as string}
          </Text>
        ) : null}
      </View>

      {saved ? (
        <View
          style={{
            backgroundColor: "#ECFDF3",
            borderRadius: 11,
            padding: 12,
            borderWidth: 1,
            borderColor: "#A7F3D0",
          }}
        >
          <Text style={{ color: "#166534", fontWeight: "600", fontSize: 13 }}>
            Perfil guardado
          </Text>
        </View>
      ) : null}

      <Button
        label="Guardar cambios"
        variant="primary"
        size="md"
        fullWidth
        loading={loading}
        disabled={!isDirty}
        onPress={handleSubmit(onSubmit)}
      />
    </SimpleScreen>
  );
}
