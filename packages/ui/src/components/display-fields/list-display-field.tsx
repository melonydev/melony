import { ListFieldConfig } from "@/lib/types/fields";
import { ListView } from "../views/list-view";

export const ListDisplayField = ({
  field,
  value,
}: {
  field: ListFieldConfig;
  value: any;
}) => {
  return (
    <div>
      <ListView
        data={value}
        fields={field.config?.fields}
        groupBy={field.config?.groupBy}
      />
    </div>
  );
};
