import React from "react";
import { BaseWidgetConfig, WidgetProps, Widget } from "./widget";

export type StaticWidgetProps = BaseWidgetConfig & {
  type: "static";
  view: {
    type: "layout";
    direction?: "vertical" | "horizontal";
    sections: WidgetProps[];
  };
};

export const StaticWidget = ({ view }: StaticWidgetProps) => {
  return (
    <div className="flex flex-col gap-4">
      {view.sections.map((section, index) => (
        <React.Fragment key={index}>
          <Widget {...section} />
        </React.Fragment>
      ))}
    </div>
  );
};
