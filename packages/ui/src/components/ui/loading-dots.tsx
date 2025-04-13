import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1.4s_infinite]" style={{ animationDelay: "0s" }} />
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1.4s_infinite]" style={{ animationDelay: "0.2s" }} />
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1.4s_infinite]" style={{ animationDelay: "0.4s" }} />
    </div>
  );
} 