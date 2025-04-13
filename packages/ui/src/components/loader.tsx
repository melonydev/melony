import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
};
