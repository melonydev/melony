import React from "react";
import {
  CallbackConfig,
  MutationConsumer,
  MutationProvider,
  QueryConsumer,
  QueryProvider,
} from "@melony/ui";

export const query = ({
  name,
  action,
  render,
}: {
  name?: string;
  action: (params: any) => Promise<any>;
  render: (query: any) => React.ReactNode;
}) => {
  return (
    <QueryProvider name={name || `action-${Math.random()}`} action={action}>
      <QueryConsumer render={render} />
    </QueryProvider>
  );
};

export const mutation = ({
  action,
  render,
  onSuccess,
  onError,
}: {
  action: (params: any) => Promise<any>;
  render: (mutation: any) => React.ReactNode;
  onSuccess?: (config: CallbackConfig) => void;
  onError?: (config: CallbackConfig) => void;
}) => {
  return (
    <MutationProvider action={action} onSuccess={onSuccess} onError={onError}>
      <MutationConsumer render={render} />
    </MutationProvider>
  );
};
