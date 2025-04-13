import { ObjectFieldConfig } from "@/lib/types/fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormFields } from "../form-fields";

export function ObjectFormField({ field }: { field: ObjectFieldConfig }) {
  const { control } = useFormContext();

  // If no tabs are defined, render fields directly
  if (!field.config?.tabs) {
    return (
      <FormField
        control={control}
        name={field.name}
        render={() => (
          <FormItem>
            <FormLabel>{field.label || field.name}</FormLabel>
            <FormControl>
              <div className="space-y-4 p-4 border rounded-lg">
                <FormFields
                  fields={(field.config?.fields || []).map((subField) => ({
                    ...subField,
                    name: `${field.name}.${subField.name}`,
                  }))}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // Render tabbed interface if tabs are defined
  return (
    <FormField
      control={control}
      name={field.name}
      render={() => (
        <FormItem>
          <FormLabel>{field.label || field.name}</FormLabel>
          <FormControl>
            <Tabs
              defaultValue={field.config?.tabs![0].label}
              className="w-full"
            >
              <TabsList>
                {field.config?.tabs!.map((tab) => (
                  <TabsTrigger key={tab.label} value={tab.label}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {field.config?.tabs!.map((tab) => (
                <TabsContent
                  key={tab.label}
                  value={tab.label}
                  className="p-4 border rounded-b-lg border-t-0"
                >
                  <div className="space-y-4">
                    <FormFields
                      fields={tab.fields.map((subField) => ({
                        ...subField,
                        name: `${field.name}.${subField.name}`,
                      }))}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
