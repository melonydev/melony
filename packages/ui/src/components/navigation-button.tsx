"use client";

import { Button as ButtonComponent } from "./ui/button";
import { useMelony } from "./melony-provider";

export function NavigationButton({
  label,
  href,
  className,
  variant,
}: {
  label: string;
  href: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  const { navigate } = useMelony();

  return (
    <ButtonComponent
      onClick={() => navigate(href)}
      className={className}
      variant={variant}
    >
      {label}
    </ButtonComponent>
  );
}
