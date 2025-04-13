import React from "react";

import {
  NavigationButton,
  Heading,
  Text,
  PrimaryButton,
  CallbackConfig,
} from "@melony/ui";

export const primaryButton = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: (config: CallbackConfig) => void;
  className?: string;
}) => {
  return (
    <PrimaryButton className={className} onClick={onClick} label={label} />
  );
};

export function navigationButton({
  label,
  href,
  className,
  variant,
}: {
  label: string;
  href: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
}) {
  return (
    <NavigationButton
      label={label}
      href={href}
      className={className}
      variant={variant}
    />
  );
}

export function heading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return <Heading title={title} className={className} />;
}

export function text({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Text className={className}>{children}</Text>;
}
