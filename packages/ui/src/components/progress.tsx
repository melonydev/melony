import { Progress as ProgressPrimitive } from "./ui/progress";

export const Progress = ({ value }: { value: number }) => {
  return <ProgressPrimitive value={value} />;
};
