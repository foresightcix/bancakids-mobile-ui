export const formatCurrency = (
  value: number,
  options: { withSymbol?: boolean; decimals?: number } = {},
): string => {
  const { withSymbol = true, decimals = 2 } = options;
  const formatted = value.toLocaleString("es-PE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return withSymbol ? `S/. ${formatted}` : formatted;
};

export const formatRelativeDate = (iso: string): string => {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHour = Math.round(diffMs / 3600000);
  const diffDay = Math.round(diffMs / 86400000);

  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `hace ${diffMin} min`;
  if (diffHour < 24) return `hace ${diffHour} h`;
  if (diffDay < 7) return `hace ${diffDay} d`;
  return date.toLocaleDateString("es-PE", { day: "numeric", month: "short" });
};

export const formatShortDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "short",
  });

export const percent = (current: number, target: number): number => {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
};
