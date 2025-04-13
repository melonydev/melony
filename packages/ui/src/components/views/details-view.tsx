import { FieldConfig } from "@/lib/types/fields";
import { FieldRenderer } from "../field-renderer";

interface DetailsViewProps {
  data: Record<string, any>;
  fields?: FieldConfig[];
}

export const DetailsView = ({ data, fields }: DetailsViewProps) => {
  const finalFields =
    fields && fields.length > 0
      ? fields
      : (Object.keys(data).map((key) => ({
          name: key,
          type: "text",
          label: key,
        })) as FieldConfig[]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="flex flex-col">
        {finalFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1 py-2.5 px-8">
            <div className="text-sm font-medium text-muted-foreground/40">
              {field?.label || field.name}
            </div>
            <div className="flex-1">
              <FieldRenderer field={field} data={data} mode="read" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
