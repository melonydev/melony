import React from "react";
import { cn } from "@/lib/utils";

export type StackProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
  className?: string;
};

export function Stack({
  children,
  direction = "column",
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))
        : children}
    </div>
  );
}
