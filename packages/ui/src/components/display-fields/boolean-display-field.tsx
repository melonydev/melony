import { Badge } from "../ui/badge";

export function BooleanDisplayField({ value }: { value: unknown }) {
  if (value) {
    return <Badge>YES</Badge>;
  }

  return <Badge variant="secondary">NO</Badge>;
}
