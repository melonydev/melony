import React from "react";
import { DataTableProps, DataTable } from "@melony/ui";

export function table(config: DataTableProps) {
  return <DataTable {...config} />;
}
