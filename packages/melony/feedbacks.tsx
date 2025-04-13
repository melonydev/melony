import React from "react";
import { Loader, Progress, toast as toastUI } from "@melony/ui";

export const loader = () => {
  return <Loader />;
};

export const progress = ({ value }: { value: number }) => {
  return <Progress value={value} />;
};

export const toastSuccess = ({ message }: { message: string }) => {
  return toastUI.success(message);
};

export const toastError = ({ message }: { message: string }) => {
  return toastUI.error(message);
};

export const toastWarning = ({ message }: { message: string }) => {
  return toastUI.warning(message);
};

export const toastInfo = ({ message }: { message: string }) => {
  return toastUI.info(message);
};
