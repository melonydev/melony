import { cn } from "@/lib/utils";

export const Spacer = ({ className }: { className?: string }) => {
  return <div className={cn("w-full p-2", className)} />;
};
