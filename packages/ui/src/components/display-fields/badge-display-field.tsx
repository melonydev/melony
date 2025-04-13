import { BadgeFieldConfig } from "@/lib/types/fields";
import { Badge } from "../ui/badge";

export function BadgeDisplayField({
  field,
  value,
}: {
  field: BadgeFieldConfig;
  value: unknown;
}) {
  // Skip rendering if it's the null placeholder
  if (value === "-") {
    return <span>-</span>;
  }

  // Determine badge color
  const badgeColor =
    typeof value === "object" && field.config?.colorKey
      ? (value as Record<string, unknown>)[field.config.colorKey]
      : field.config?.colorMap?.[value as string] || field.config?.color;

  const badgeTypes = field.config?.colorTypes;

  return (
    <Badge
      variant={
        (badgeColor as
          | "default"
          | "secondary"
          | "destructive"
          | "outline"
          | null
          | undefined) || "default"
      }
      className={badgeTypes?.[value as string] || ""}
    >
      {value as string}
    </Badge>
  );
}
