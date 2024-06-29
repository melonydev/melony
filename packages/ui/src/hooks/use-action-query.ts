import { useQuery } from "@tanstack/react-query";

export function useActionQuery({ action }: { action: () => Promise<unknown> }) {
	return useQuery({ queryKey: ["some-key"], queryFn: action });
}
