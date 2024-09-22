import { useMutation } from "@tanstack/react-query";

export function useActionMutation({
	action,
}: {
	action: (data: any) => Promise<unknown>;
}) {
	return useMutation({ mutationKey: ["some-key"], mutationFn: action });
}
