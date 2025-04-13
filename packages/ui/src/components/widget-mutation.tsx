"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FieldConfig } from "@/lib/types/fields";
import { BaseWidgetConfig } from "./widget";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useVariables } from "./variables-context";
import { FormView } from "./views/form-view";
import { ActionConfig } from "@/hooks/use-action";

export type MutationWidgetProps = BaseWidgetConfig & {
  type: "mutation";
  data?: {
    type: "rest";
    url: string;
    method: "POST" | "PUT" | "DELETE";
    params?: Record<string, string>;
    headers?: Record<string, string>;
    defaultValues?: Record<string, string>;
  };
  view: {
    type: "form";
    fields?: FieldConfig[];
  };
  callbackActions?: {
    success?: ActionConfig;
    error?: ActionConfig;
  };
};

export const MutationWidget = ({ slug, data, view }: MutationWidgetProps) => {
  const { setVariable } = useVariables();
  const { resolveTemplate } = useVariables();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [data?.url, data?.method, data?.params, data?.headers],
    mutationFn: (values: any) => {
      const resolvedUrl = resolveTemplate(data?.url || "");

      if (resolvedUrl.includes("{") || resolvedUrl.includes("}")) {
        throw new Error(`Resolved URL contains variables: ${resolvedUrl}`);
      }

      const resolvedParams = Object.entries(data?.params || {}).reduce(
        (acc, [key, value]) => {
          acc[key] = resolveTemplate(value);
          return acc;
        },
        {} as Record<string, string>
      );

      const resolvedHeaders = Object.entries(data?.headers || {}).reduce(
        (acc, [key, value]) => {
          acc[key] = resolveTemplate(value);
          return acc;
        },
        {} as Record<string, string>
      );

      return axios(resolvedUrl, {
        method: data?.method || "POST",
        params: resolvedParams,
        headers: resolvedHeaders,
        data: values,
      });
    },
    onSuccess: (data) => {
      setVariable(`${slug}Success`, data);
    },
    onError: (error) => {
      setVariable(`${slug}Error`, error);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6 px-6 py-8">
        <FormView
          fields={view.fields || []}
          onSubmit={mutate}
          isPending={isPending}
          defaultValues={data?.defaultValues}
        />

        {error && (
          <div className="flex flex-col gap-2">
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};
