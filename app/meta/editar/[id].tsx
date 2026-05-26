import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Backpack,
  BookOpen,
  CalendarBlank,
  CheckCircle,
  GameController,
  Gift,
  PencilSimple,
  Star,
  X,
  type IconProps,
} from "phosphor-react-native";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/BottomSheet";
import { SuccessToast } from "@/components/states";
import { api } from "@/api";
import type { SavingGoal } from "@/types";
import { colors } from "@/theme/tokens";
import { BottomTabBar } from "@/components/BottomTabBar";

const QUICK_AMOUNTS = [20, 50, 100, 200];

const ICONS: { key: string; Icon: React.ComponentType<IconProps> }[] = [
  { key: "book-open", Icon: BookOpen },
  { key: "backpack", Icon: Backpack },
  { key: "game-controller", Icon: GameController },
  { key: "gift", Icon: Gift },
  { key: "star", Icon: Star },
];

interface FormData {
  name: string;
  amount: string;
  deadline: string;
  description: string;
  icon: string;
}

export default function EditarMeta() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<SavingGoal | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      amount: "",
      deadline: "",
      description: "",
      icon: "book-open",
    },
    mode: "onChange",
  });

  useEffect(() => {
    api.getGoals().then((gs) => {
      const g = gs.find((x) => x.id === id);
      if (g) {
        setGoal(g);
        reset({
          name: g.title.replace(/^Ahorrar\s+/i, ""),
          amount: String(g.targetAmount.toFixed(2)),
          deadline: g.deadline
            ? new Date(g.deadline).toLocaleDateString("es-PE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "",
          description: "",
          icon: "book-open",
        });
      }
    });
  }, [id, reset]);

  const currentAmount = parseFloat(watch("amount") || "0");
  const currentIcon = watch("icon");

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setShowToast(true);
    setTimeout(() => router.back(), 600);
  };

  const tryExit = () => {
    if (isDirty) {
      setShowDiscard(true);
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <AppHeader variant="secondary" />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={tryExit}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Atrás"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <ArrowLeft size={24} color={colors.textHeading} weight="bold" />
          <Text
            style={{ color: colors.textPrimary, fontSize: 14, fontWeight: "500" }}
          >
            Atrás
          </Text>
        </Pressable>
        <Pressable
          onPress={tryExit}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Cerrar"
          style={({ pressed }) => ({
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: colors.neutral100,
            borderWidth: 1,
            borderColor: colors.neutral250,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <X size={18} color={colors.muted} weight="bold" />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 4,
          paddingBottom: 24,
          gap: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {goal ? "Editar meta" : "Nueva meta de ahorro"}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Define un objetivo financiero para motivar a tu hijo/a a ahorrar
          </Text>
        </View>

        {/* Field: Nombre */}
        <Field label="Nombre de la meta" error={errors.name?.message as string}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Escribe un nombre", minLength: 3 }}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej. Comprar un libro de cuentos"
                placeholderTextColor={colors.placeholder}
                style={{
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: errors.name ? "#DC2626" : "#D1D5DB",
                  padding: 14,
                  paddingHorizontal: 16,
                  fontSize: 14,
                  color: colors.textPrimary,
                }}
              />
            )}
          />
        </Field>

        {/* Field: Monto */}
        <Field label="Monto objetivo" error={errors.amount?.message as string}>
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
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: errors.amount ? "#DC2626" : "#D1D5DB",
                  padding: 14,
                  paddingHorizontal: 16,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text
                    style={{
                      color: colors.textPrimary,
                      fontSize: 16,
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
                      fontSize: 16,
                      fontWeight: "700",
                      color: colors.textPrimary,
                      padding: 0,
                      minWidth: 100,
                    }}
                  />
                </View>
                <PencilSimple size={18} color={colors.placeholder} />
              </View>
            )}
          />
        </Field>

        {/* Quick amounts */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {QUICK_AMOUNTS.map((n) => {
            const selected = currentAmount === n;
            return (
              <Pressable
                key={n}
                onPress={() =>
                  setValue("amount", String(n), { shouldValidate: true, shouldDirty: true })
                }
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={({ pressed }) => ({
                  backgroundColor: selected ? colors.missionPeach : colors.primarySoft,
                  borderWidth: selected ? 1.5 : 0,
                  borderColor: selected ? colors.accent : "transparent",
                  borderRadius: 18,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text
                  style={{
                    color: selected ? colors.accent : colors.primary,
                    fontSize: 13,
                    fontWeight: selected ? "700" : "600",
                  }}
                >
                  S/.{n}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Field: Fecha */}
        <Field label="Fecha límite">
          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, value, onBlur } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  padding: 14,
                  paddingHorizontal: 16,
                }}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Ej. 15 de abril, 2026"
                  placeholderTextColor={colors.placeholder}
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: colors.textPrimary,
                    padding: 0,
                  }}
                />
                <CalendarBlank size={18} color={colors.placeholder} />
              </View>
            )}
          />
        </Field>

        {/* Field: Descripción */}
        <Field label="Descripción (opcional)">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej: Quiero ahorrar para comprar un libro sobre animales en la feria del libro"
                placeholderTextColor={colors.placeholder}
                multiline
                style={{
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  padding: 14,
                  paddingHorizontal: 16,
                  fontSize: 14,
                  color: colors.textPrimary,
                  minHeight: 80,
                  textAlignVertical: "top",
                  lineHeight: 20,
                }}
              />
            )}
          />
        </Field>

        {/* Icon selector */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Ícono de la meta
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {ICONS.map(({ key, Icon }) => {
              const selected = currentIcon === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setValue("icon", key, { shouldDirty: true })}
                  accessibilityRole="button"
                  accessibilityLabel={`Ícono ${key}`}
                  accessibilityState={{ selected }}
                  style={({ pressed }) => ({
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: selected ? colors.missionPeach : colors.neutral100,
                    borderWidth: selected ? 2 : 0,
                    borderColor: selected ? colors.accent : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Icon
                    size={22}
                    color={selected ? colors.accent : colors.muted}
                    weight={selected ? "fill" : "regular"}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* CTA Section */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 12, gap: 10 }}>
        <Button
          label={loading ? "Guardando..." : "Guardar meta"}
          variant="primary"
          size="md"
          fullWidth
          loading={loading}
          leftIcon={<CheckCircle size={18} color="#FFFFFF" weight="fill" />}
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          label="Cancelar"
          variant="secondary"
          size="sm"
          fullWidth
          onPress={tryExit}
        />
      </View>

      <BottomSheet
        visible={showDiscard}
        onClose={() => setShowDiscard(false)}
        title="¿Descartar cambios?"
      >
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 20,
          }}
        >
          Perderás los cambios hechos a esta meta. Esta acción no se puede
          deshacer.
        </Text>
        <View style={{ gap: 10 }}>
          <Button
            label="Seguir editando"
            variant="secondary"
            size="md"
            fullWidth
            onPress={() => setShowDiscard(false)}
          />
          <Button
            label="Descartar"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => {
              setShowDiscard(false);
              router.back();
            }}
          />
        </View>
      </BottomSheet>

      <SuccessToast
        visible={showToast}
        message="Meta actualizada"
        onClose={() => setShowToast(false)}
      />
      <BottomTabBar activeKey="monitorear" />
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 13,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      {children}
      {error ? (
        <Text style={{ color: "#DC2626", fontSize: 12 }}>{error}</Text>
      ) : null}
    </View>
  );
}
