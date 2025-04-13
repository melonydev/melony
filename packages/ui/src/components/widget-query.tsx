"use client";

import axios from "axios";
import { FieldConfig } from "@/lib/types/fields";
import { useQuery } from "@tanstack/react-query";
import { ListView } from "./views/list-view";
import { DetailsView } from "./views/details-view";
import { BaseWidgetConfig } from "./widget";
import { ActionConfig, useAction } from "@/hooks/use-action";
import { Loader2Icon } from "lucide-react";
import { useVariables } from "./variables-context";
import { transformData } from "@/lib/utils";

export type ListQueryWidgetView = {
  type: "list";
  fields: FieldConfig[];
  itemClickAction?: ActionConfig;
  headerActions?: ActionConfig[];
  itemActions?: ActionConfig[];
};

export type DetailQueryWidgetView = {
  type: "details";
  fields: FieldConfig[];
};

export type QueryWidgetProps = BaseWidgetConfig & {
  type: "query";
  data?: {
    type: "rest";
    url: string;
    method: "GET" | "POST";
    params: Record<string, string>;
    headers: Record<string, string>;
    transform?: string;
  };
  view: ListQueryWidgetView | DetailQueryWidgetView;
};

export const QueryWidget = ({ data, view }: QueryWidgetProps) => {
  const { execute } = useAction();
  const { resolveTemplate } = useVariables();

  const finalUrl = resolveTemplate(data?.url || "");

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [finalUrl, data?.method, data?.params, data?.headers],
    queryFn: async () => {
      if (finalUrl.includes("{") || finalUrl.includes("}")) {
        throw new Error(`Final URL contains variables: ${finalUrl}`);
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

      const response = await axios(finalUrl, {
        params: resolvedParams,
        method: data?.method || "GET",
        headers: resolvedHeaders,
      });

      return transformData(response.data, data?.transform);
    },
    enabled: !!data,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full w-full p-8">
        <Loader2Icon className="w-4 h-4 animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-full w-full p-8">
        Error: {error.message}
      </div>
    );

  if (view.type === "list") {
    return (
      <>
        <ListView
          data={queryData}
          fields={view.fields}
          isLoading={isLoading}
          error={error}
          onItemClick={(item) => {
            if (view.itemClickAction) {
              execute(view.itemClickAction, item);
            }
          }}
          headerActions={view.headerActions?.map((action) => ({
            label: action.label ?? "Unknown action",
            onClick: () => execute(action),
          }))}
          itemActions={view.itemActions?.map((action) => ({
            label: action.label ?? "Unknown action",
            onClick: (item) => {
              execute(action, item);
            },
          }))}
        />
      </>
    );
  }

  if (view.type === "details") {
    return <DetailsView data={queryData} fields={view.fields} />;
  }

  return <div>{JSON.stringify(queryData, null, 2)}</div>;
};
