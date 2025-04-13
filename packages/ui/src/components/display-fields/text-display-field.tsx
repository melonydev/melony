import { TextFieldConfig } from "@/lib/types/fields";
import { cn } from "@/lib/utils";

export function TextDisplayField({
  field,
  value,
}: {
  field: TextFieldConfig;
  value: unknown;
}) {
  const truncate = field.config?.truncate || true;

  if (typeof value === "object") {
    return (
      <span className="whitespace-normal max-w-[400px]">
        {JSON.stringify(value, null, 2)}
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <span className={cn("whitespace-normal", { truncate })}>
        {JSON.stringify(value, null, 2)}
      </span>
    );
  }

  return (
    <span className={cn("block truncate", { truncate })}>
      {value as string}
    </span>
  );
}
