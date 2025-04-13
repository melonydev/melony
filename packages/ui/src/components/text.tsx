import { cn } from "@/lib/utils";

export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-sm", className)}>{children}</p>;
};
