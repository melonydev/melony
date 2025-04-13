import React from "react";

import {
  Form,
  TextFormField,
  PasswordFormField,
  SubmitButton,
} from "@melony/ui";

export const form = ({
  children,
  onSubmit,
}: {
  children: React.JSX.Element[];
  onSubmit: (data: any) => Promise<any>;
}) => {
  return (
    <Form defaultValues={{}} onSubmit={onSubmit}>
      {children}
    </Form>
  );
};

export const submitButton = (props?: {
  label?: string;
  isSubmitting?: boolean;
}) => {
  return (
    <SubmitButton
      label={props?.label || "Submit"}
      isSubmitting={props?.isSubmitting || false}
    />
  );
};

export const formTextInput = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  return <TextFormField field={{ type: "text", label, name }} />;
};

export const formPasswordInput = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  return <PasswordFormField field={{ type: "password", label, name }} />;
};
