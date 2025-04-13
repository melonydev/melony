import { SendIcon } from "lucide-react";
import { FormFields } from "../form-fields";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FieldConfig } from "@/lib/types/fields";
import { useForm } from "react-hook-form";
import { useVariables } from "../variables-context";

export const FormView = ({
  fields,
  onSubmit,
  isPending,
  defaultValues,
}: {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
  isPending: boolean;
  defaultValues?: Record<string, string>;
}) => {
  const { resolveTemplate } = useVariables();

  const resolvedDefaultValues = Object.entries(defaultValues || {}).reduce(
    (acc, [key, value]) => {
      acc[key] = resolveTemplate(value);
      return acc;
    },
    {} as Record<string, string>
  );

  const form = useForm({
    defaultValues: resolvedDefaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
        <FormFields fields={fields} />

        <div className="mt-6">
          <Button type="submit" disabled={isPending}>
            <SendIcon className="w-4 h-4" />
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
