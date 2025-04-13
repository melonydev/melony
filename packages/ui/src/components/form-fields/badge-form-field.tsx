import { BadgeFieldConfig } from "@/lib/types/fields";
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
import { Badge } from "../ui/badge";

export function BadgeFormField({ field }: { field: BadgeFieldConfig }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: rhfField }) => (
        <FormItem>
          <FormLabel>{field?.label || field.name}</FormLabel>
          <FormControl>
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                value={rhfField.value || ""}
                onChange={(e) => rhfField.onChange(e.target.value)}
                placeholder={field.config?.placeholder}
                maxLength={field.config?.maxLength}
                disabled={field.disabled}
                required={field.required}
              />
              <Badge variant={field.config?.variant || "default"}>
                {rhfField.value || "Preview"}
              </Badge>
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