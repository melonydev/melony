import { IconFieldConfig } from "@/lib/types/fields";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

type LucideIconType = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
type LucideIconsType = { [K in keyof typeof LucideIcons]: LucideIconType };

export function IconDisplayField({
  field,
  value,
}: {
  field: IconFieldConfig;
  value: unknown;
}) {
  const Icon = value
    ? (LucideIcons as unknown as LucideIconsType)[value as keyof LucideIconsType]
    : null;
  const DefaultIcon = field.config?.defaultIcon
    ? (LucideIcons as unknown as LucideIconsType)[field.config.defaultIcon as keyof LucideIconsType]
    : null;

  if (Icon) {
    return <Icon className="w-4 h-4" />;
  }

  if (DefaultIcon) {
    return <DefaultIcon className="w-4 h-4" />;
  }

  return <span className="text-muted-foreground">-</span>;
}
