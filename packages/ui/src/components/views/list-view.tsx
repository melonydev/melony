"use client";

import { FieldConfig } from "@/lib/types/fields";
import { FieldRenderer } from "../field-renderer";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ListViewProps {
  data?: any[];
  isLoading?: boolean;
  error?: Error | null;
  fields?: FieldConfig[];
  onItemClick?: (item: any) => void;
  headerActions?: {
    label: string;
    onClick: () => void;
  }[];
  itemActions?: {
    label: string;
    onClick: (item: any) => void;
  }[];
  groupBy?: string; // Field name to group by
}

export const ListView = ({
  data = [],
  isLoading,
  error,
  fields,
  onItemClick,
  headerActions,
  itemActions,
  groupBy,
}: ListViewProps) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (Array.isArray(data) && data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="text-sm text-muted-foreground">No data</div>
      </div>
    );

  const finalFields =
    fields && fields.length > 0
      ? fields
      : (Object.keys(data?.[0] || {})?.map((key) => ({
          name: key,
          type: "text" as const,
          label: key,
        })) as FieldConfig[]);

  // Group data if groupBy is specified
  const groupedData: Record<string, any[]> = groupBy
    ? data.reduce(
        (acc, item) => {
          const groupKey = item[groupBy] || "Uncategorized";
          if (!acc[groupKey]) {
            acc[groupKey] = [];
          }
          acc[groupKey].push(item);
          return acc;
        },
        {} as Record<string, any[]>
      )
    : { "All Items": data };

  return (
    <div className="flex flex-col w-full h-full">
      {headerActions && (
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 justify-between w-full">
            <div>
              {/* <Button variant="outline" onClick={() => router.push("/")}>
                <ArrowLeftIcon className="w-4 h-4" />
              </Button> */}
            </div>

            <div className="flex items-center gap-2">
              {headerActions.map((action, index) => (
                <Button key={index} variant="outline" onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header row */}
      {data.length > 0 && (
        <div className="sticky top-0 border-b bg-background">
          <div className="flex p-2">
            {finalFields.map((field, index) => (
              <div
                key={index}
                className={cn("truncate px-4 py-1 opacity-80 text-xs")}
                style={{
                  width: field.width ? field.width : 160,
                  minWidth: field.minWidth ? field.minWidth : undefined,
                  maxWidth: field.maxWidth ? field.maxWidth : undefined,
                }}
              >
                {field?.label || field.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data rows */}
      <div className="divide-y">
        {Object.entries(groupedData).map(([groupName, groupItems]) => (
          <div key={groupName}>
            {groupBy && (
              <div className="bg-muted px-4 py-2 text-sm font-medium">
                {groupName}
              </div>
            )}
            {groupItems.map((item: any, index: number) => (
              <div
                key={index}
                className={cn(`flex px-2 py-1 hover:bg-muted/20`, {
                  "cursor-pointer": !!onItemClick,
                })}
                onClick={() => onItemClick?.(item)}
              >
                {finalFields.map((field, index) => (
                  <div
                    key={index}
                    className="truncate px-4 py-2"
                    style={{
                      width: field.width ? field.width : 160,
                      minWidth: field.minWidth ? field.minWidth : undefined,
                      maxWidth: field.maxWidth ? field.maxWidth : undefined,
                    }}
                  >
                    <FieldRenderer field={field} data={item} mode="read" />
                  </div>
                ))}
                {itemActions && (
                  <div className="flex items-center px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {itemActions.map((action, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item);
                            }}
                          >
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
