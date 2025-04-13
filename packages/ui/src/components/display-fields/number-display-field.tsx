export function NumberDisplayField({ value }: { value: unknown }) {
  return <p className="text-foreground">{value?.toString() || "-"}</p>;
}
