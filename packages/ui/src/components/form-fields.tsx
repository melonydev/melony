import { FieldConfig } from "@/lib/types/fields";
import { FieldRenderer } from "./field-renderer";

export function FormFields({ fields }: { fields: FieldConfig[] }) {
  if (fields.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mb-2">
      {fields.map((field, index) => {
        return <FieldRenderer key={index} field={field} mode="edit" />;
      })}
    </div>
  );
}
