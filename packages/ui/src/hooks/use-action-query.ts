import { useQuery } from "@tanstack/react-query";

export function useActionQuery({
	action,
}: {
	action: (data: any) => Promise<unknown>;
}) {
	return useQuery<any>({ queryKey: ["some-key"], queryFn: () => action({}) });
}
