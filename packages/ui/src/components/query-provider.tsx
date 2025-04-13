import { createContext, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const QueryContext = createContext<UseQueryResult<any, Error> | null>(null);

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within a QueryProvider");
  }
  return context;
};

export const QueryProvider = ({
  name,
  action,
  children,
}: {
  name: string;
  action: (params?: any) => Promise<any>;
  children: React.ReactNode;
}) => {
  const query = useQuery({
    queryKey: ["query", name],
    queryFn: () => action(),
  });

  return (
    <QueryContext.Provider value={query}>{children}</QueryContext.Provider>
  );
};
