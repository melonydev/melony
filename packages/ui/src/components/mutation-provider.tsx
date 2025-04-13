import { createContext, useContext } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useMelony } from "./melony-provider";
import { useModal } from "./modal-provider";
import { CallbackConfig } from "../lib/types/actions";

const MutationContext = createContext<UseMutationResult<any, any, any> | null>(
  null
);

export const useMutationContext = () => {
  const context = useContext(MutationContext);
  if (!context) {
    throw new Error(
      "useMutationContext must be used within a MutationProvider"
    );
  }
  return context;
};

export const MutationProvider = ({
  children,
  action,
  onSuccess,
  onError,
}: {
  children: React.ReactNode;
  action?: (data: any) => Promise<any>;
  onSuccess?: (config: CallbackConfig) => void;
  onError?: (config: CallbackConfig) => void;
}) => {
  const { navigate } = useMelony();
  const modal = useModal();

  const mutation = useMutation({
    mutationFn: action,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess({ data, navigate, ...modal });
      }
    },
    onError: (error) => {
      if (onError) {
        onError({ error, navigate, ...modal });
      }
    },
  });

  return (
    <MutationContext.Provider value={mutation}>
      {children}
    </MutationContext.Provider>
  );
};
