"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type VariablesContextType = {
  variables: Record<string, any>;
  setVariable: (key: string, value: any) => void;
  removeVariable: (key: string) => void;
  resolveTemplate: (
    template: string,
    additionalVariables?: Record<string, any>
  ) => string;
};

const VariablesContext = createContext<VariablesContextType | null>(null);

export function VariablesProvider({
  children,
  initialVariables = {},
}: {
  children: ReactNode;
  initialVariables?: Record<string, any>;
}) {
  // State for all variables
  const [variables, setVariables] = useState<Record<string, any>>(() => ({
    ...initialVariables,
  }));

  const setVariable = (key: string, value: any) => {
    setVariables((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeVariable = (key: string) => {
    setVariables((prev) => {
      const newVars = { ...prev };
      delete newVars[key];
      return newVars;
    });
  };

  const resolveTemplate = (
    template: string,
    additionalVariables?: Record<string, any>
  ): string => {
    const allVariables = {
      ...variables,
      ...additionalVariables,
    };

    return (template || "")?.replace(/\{([^}]+)\}/g, (match, key) => {
      return (
        key
          .split(".")
          .reduce((obj: any, prop: string) => obj?.[prop], allVariables) ||
        match
      );
    });
  };

  const value = {
    variables,
    setVariable,
    removeVariable,
    resolveTemplate,
  };

  return (
    <VariablesContext.Provider value={value}>
      {children}
    </VariablesContext.Provider>
  );
}

export function useVariables() {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("useVariables must be used within a VariablesProvider");
  }
  return context;
}
