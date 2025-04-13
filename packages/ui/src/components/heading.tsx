import { cn } from "@/lib/utils";

export const Heading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h1 className={cn("text-2xl font-bold", className)}>{title}</h1>;
};
