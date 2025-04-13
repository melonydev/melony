import { JsonFieldConfig } from "@/lib/types/fields";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function JsonFormField({ field }: { field: JsonFieldConfig }) {
  const { control } = useFormContext();
  const [error, setError] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => {
        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const newValue = e.target.value;
          try {
            if (newValue.trim()) {
              // Parse the JSON to validate and store as object
              const parsedJson = JSON.parse(newValue);
              setError(null);
              // Store the parsed JSON object
              formField.onChange(parsedJson);
            } else {
              formField.onChange(null);
            }
          } catch {
            setError("Invalid JSON format");
            // Store the raw string when invalid to preserve user input
            formField.onChange(newValue);
          }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (
            (e.metaKey || e.ctrlKey) &&
            e.shiftKey &&
            e.key.toLowerCase() === "f"
          ) {
            e.preventDefault();
            try {
              const currentValue =
                typeof formField.value === "string"
                  ? JSON.parse(formField.value)
                  : formField.value;
              const formatted = JSON.stringify(currentValue, null, 2);
              formField.onChange(JSON.parse(formatted));
              setError(null);
            } catch {
              setError("Cannot format invalid JSON");
            }
          }
        };

        return (
          <FormItem>
            <FormLabel>{field.label || field.name}</FormLabel>
            <FormControl>
              <Textarea
                value={
                  typeof formField.value === "object"
                    ? JSON.stringify(formField.value, null, 2)
                    : formField.value || ""
                }
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="font-mono min-h-[200px]"
                placeholder="Enter JSON here..."
                disabled={field.disabled}
              />
            </FormControl>
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
}
