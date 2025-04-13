"use client";

import { createContext, useContext, useState } from "react";
import { VariablesProvider } from "./variables-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./ui/sonner";
import { ModalProvider } from "./modal-provider";

export const MelonyContext = createContext<{
  navigate: (path: string) => void;
  appName: string;
}>({
  navigate: () => {},
  appName: "",
});

export const MelonyProvider = ({
  children,
  appName,
  navigate,
}: {
  children: React.ReactNode;
  appName: string;
  navigate?: (path: string) => void;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MelonyContext.Provider
        value={{ navigate: navigate ?? (() => {}), appName }}
      >
        <VariablesProvider>
          <ModalProvider>{children}</ModalProvider>
          <Toaster />
        </VariablesProvider>
      </MelonyContext.Provider>
    </QueryClientProvider>
  );
};

export const useMelony = () => {
  return useContext(MelonyContext);
};
