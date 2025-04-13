"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

export function Query({
  query,
  Component,
}: {
  query: any;
  Component: React.ComponentType<any>;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["query", query],
    queryFn: () => query({ page: 1, pageSize: 10 }),
  });

  return <Component data={data} isLoading={isLoading} error={error} />;
}
