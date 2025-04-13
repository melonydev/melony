import { DateFieldConfig } from "@/lib/types/fields";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

export function DateFormField({ field }: { field: DateFieldConfig }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: rhfField }) => {
        const hasTime = field.config?.hasTime ?? false;

        const value = rhfField.value
          ? hasTime
            ? new Date(rhfField.value).toISOString().slice(0, 16)
            : new Date(rhfField.value).toISOString().split("T")[0]
          : "";

        return (
          <FormItem>
            <FormLabel>{field?.label || field.name}</FormLabel>
            <FormControl>
              <Input
                type={hasTime ? "datetime-local" : "date"}
                value={value}
                onChange={(e) => rhfField.onChange(e.target.value)}
                min={field.config?.minDate?.toISOString().split("T")[0]}
                max={field.config?.maxDate?.toISOString().split("T")[0]}
                disabled={field.disabled}
                required={field.required}
              />
            </FormControl>
            {field?.description && (
              <FormDescription>{field?.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
