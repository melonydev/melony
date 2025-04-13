import { Button } from "./ui/button";

export function SubmitButton({
  label,
  isSubmitting,
}: {
  label: string;
  isSubmitting: boolean;
}) {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : label}
    </Button>
  );
}
