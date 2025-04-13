import { ComboboxFieldConfig } from "@/lib/types/fields";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Combobox } from "@/components/ui/combobox";

export function ComboboxFormField({ field }: { field: ComboboxFieldConfig }) {
  const { control } = useFormContext();

  // TODO: add a query request to fetch the options
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: rhfField }) => (
        <FormItem>
          <FormLabel>{field?.label || field.name}</FormLabel>
          <FormControl>
            <div>
              <Combobox
                options={[].map((record: Record<string, unknown>) => ({
                  label:
                    field.config?.displayField &&
                    record?.[field.config?.displayField]
                      ? (record?.[field.config?.displayField] as string)
                      : (record?.title as string) || (record?.name as string),
                  value: (record.id as string) || "",
                }))}
                value={rhfField.value}
                onChange={rhfField.onChange}
              />
            </div>
          </FormControl>
          {field?.description && (
            <FormDescription>{field?.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
