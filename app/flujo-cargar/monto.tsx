import { useEffect } from "react";
import { ScrollView, Text, TextInput, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { FlowHeader } from "@/components/FlowHeader";
import { FlowFooter } from "@/components/FlowFooter";
import { api } from "@/api";
import { useCargarFlow } from "@/store/cargarFlow";
import { colors } from "@/theme/tokens";
import { formatCurrency } from "@/utils/format";
import { useState } from "react";

const QUICK_AMOUNTS = [5, 10, 20, 50];

interface FormData {
  amount: string;
}

export default function MontoScreen() {
  const router = useRouter();
  const { setAmount, amount } = useCargarFlow();
  const [saldo, setSaldo] = useState<number>(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: { amount: amount ? String(amount.toFixed(2)) : "" },
    mode: "onChange",
  });

  useEffect(() => {
    api.getChild().then((c) => setSaldo(c.balance));
  }, []);

  const currentAmount = parseFloat(watch("amount") || "0");

  const onSubmit = (data: FormData) => {
    const n = parseFloat(data.amount);
    if (isNaN(n) || n <= 0) return;
    setAmount(n);
    router.push("/flujo-cargar/motivo" as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FlowHeader step={1} totalSteps={4} title="Cargar dinero" showBack />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Amount card */}
        <View
          style={{
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#EEF2F7",
            padding: 14,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              DINERO AHORRADO
            </Text>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 13,
                fontWeight: "700",
              }}
            >
              {formatCurrency(saldo)}
            </Text>
          </View>

          <Controller
            control={control}
            name="amount"
            rules={{
              required: "Ingresa un monto",
              validate: (v) => {
                const n = parseFloat(v);
                if (isNaN(n) || n <= 0) return "El monto debe ser mayor a 0";
                if (n > 9999) return "Monto demasiado alto";
                return true;
              },
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <View
                style={{
                  borderRadius: 11,
                  borderWidth: 1.5,
                  borderColor: errors.amount ? "#DC2626" : colors.primary,
                  padding: 10,
                  paddingHorizontal: 12,
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  Ingresar monto manual
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 24,
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
                      color: colors.primary,
                      fontSize: 24,
                      fontWeight: "700",
                      padding: 0,
                    }}
                    accessibilityLabel="Monto a cargar"
                  />
                </View>
              </View>
            )}
          />
          {errors.amount ? (
            <Text style={{ color: "#DC2626", fontSize: 12, marginLeft: 4 }}>
              {errors.amount.message as string}
            </Text>
          ) : null}
        </View>

        <View style={{ gap: 10 }}>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: "700",
            }}
          >
            Montos rápidos
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {QUICK_AMOUNTS.slice(0, 3).map((n) => {
              const selected = currentAmount === n;
              return (
                <Pressable
                  key={n}
                  onPress={() => setValue("amount", String(n), { shouldValidate: true })}
                  style={({ pressed }) => ({
                    flex: 1,
                    height: 44,
                    borderRadius: 11,
                    borderWidth: selected ? 1.5 : 1,
                    borderColor: selected ? colors.primary : colors.neutral200,
                    backgroundColor: selected ? colors.primary : "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: pressed ? 0.85 : 1,
                  })}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={{
                      color: selected ? "#FFFFFF" : colors.textPrimary,
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    S/. {n}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <FlowFooter label="Siguiente" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
