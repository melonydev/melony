import { DetailsFieldConfig } from "@/lib/types/fields";
import { DetailsView } from "../views/details-view";

export const DetailsDisplayField = ({
  field,
  value,
}: {
  field: DetailsFieldConfig;
  value: any;
}) => {
  return (
    <div>
      <DetailsView data={value} fields={field.config?.fields} />
    </div>
  );
};
