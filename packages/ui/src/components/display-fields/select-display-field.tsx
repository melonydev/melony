import { SelectFieldConfig } from "@/lib/types/fields";

export function SelectDisplayField({
  field,
  value,
}: {
  field: SelectFieldConfig;
  value: unknown;
}) {
  const option = field.config?.options?.find((opt) => opt.value === value);

  return <p className="text-foreground">{option?.label || "-"}</p>;
}
