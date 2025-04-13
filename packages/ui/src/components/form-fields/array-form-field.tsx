import { ArrayFieldConfig } from "@/lib/types/fields";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { FormFields } from "../form-fields";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

export function ArrayFormField({ field }: { field: ArrayFieldConfig }) {
  const { control, watch } = useFormContext();
  const values = watch(field.name) || [];

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label || field.name}</FormLabel>
          <FormControl>
            <div className="space-y-4">
              {values.map((_: unknown, index: number) => (
                <div key={index} className="relative p-4 border rounded-lg">
                  <div className="absolute top-2 right-2">
                    <Button
                      type="button"
                      onClick={() => {
                        const newValue = [...(formField.value || [])];
                        newValue.splice(index, 1);
                        formField.onChange(newValue);
                      }}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <FormFields
                    fields={(field.config?.fields || []).map((subField) => ({
                      ...subField,
                      name: `${field.name}.${index}.${subField.name}`,
                    }))}
                  />
                </div>
              ))}
              <Button
                size={"sm"}
                type="button"
                variant={"secondary"}
                onClick={() => {
                  const newValue: Record<string, string> = {};
                  (field.config?.fields || []).forEach((subField) => {
                    newValue[subField.name] = "";
                  });
                  formField.onChange([...(formField.value || []), newValue]);
                }}
              >
                Add {field.label || field.name}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
