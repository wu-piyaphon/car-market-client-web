export function fCurrency(value: string | number) {
  return new Intl.NumberFormat("th-TH").format(
    typeof value === "string" ? parseFloat(value) : value,
  );
}
