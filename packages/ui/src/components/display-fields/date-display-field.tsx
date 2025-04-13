import { DateFieldConfig } from "@/lib/types/fields";
import { format } from "date-fns";

export function DateDisplayField({
  field,
  value,
}: {
  field: DateFieldConfig;
  value: unknown;
}) {
  const hasTime = field.config?.hasTime ?? false;

  return (
    <p className="text-foreground">
      {value
        ? format(
            typeof value === "string" || typeof value === "number"
              ? new Date(value as string | number)
              : (value as Date),
            field.config?.format ?? `MM/dd/yyyy ${hasTime ? "HH:mm:ss" : ""}`
          )
        : "-"}
    </p>
  );
}
