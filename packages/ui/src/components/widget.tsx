"use client";

import { QueryWidget, QueryWidgetProps } from "./widget-query";
import { MutationWidget, MutationWidgetProps } from "./widget-mutation";
import { StaticWidget, StaticWidgetProps } from "./widget-static";
import { Loader2 } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Switch } from "./ui/switch";
// import { useState } from "react";

export type BaseWidgetConfig = {
  slug: string;
  name?: string;

  id?: string;
  project_id?: string;

  isLoading?: boolean;
};

export type WidgetProps =
  | QueryWidgetProps
  | MutationWidgetProps
  | StaticWidgetProps;

const WidgetLayout = ({
  widget,
  children,
}: {
  widget: WidgetProps;
  children: React.ReactNode;
}) => {
  // const [isJsonView, setIsJsonView] = useState(false);

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex flex-col h-full">
        {!widget.isLoading && (
          <div className="flex items-center gap-4 py-2.5 px-5 border-b">
            <div className="font-semibold">{widget?.name || widget.slug}</div>

            {/* {widget.type === "query" ? (
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Query
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-700"
              >
                Mutation
              </Badge>
            )}

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Preview</span>
              <Switch
                checked={isJsonView}
                onCheckedChange={setIsJsonView}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm text-muted-foreground">JSON</span>
            </div> */}
          </div>
        )}

        {/* {widget.isLoading ? (
          <div className="flex items-center justify-center h-full flex-1">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : isJsonView ? (
          <div className="p-4 h-full overflow-y-auto">
            <pre className="bg-muted p-4 rounded-md overflow-auto">
              {JSON.stringify(widget, null, 2)}
            </pre>
          </div>
        ) : (
          children
        )} */}

        {widget.isLoading ? (
          <div className="flex items-center justify-center h-full flex-1">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export const Widget = (props: WidgetProps) => {
  return (
    <WidgetLayout widget={props}>
      {props.type === "query" ? (
        <QueryWidget {...props} />
      ) : props.type === "mutation" ? (
        <MutationWidget {...props} />
      ) : (
        <StaticWidget {...props} />
      )}
    </WidgetLayout>
  );
};
