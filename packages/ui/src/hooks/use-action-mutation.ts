import { useMutation } from "@tanstack/react-query";

export function useActionMutation({
	action,
}: {
	action: () => Promise<unknown>;
}) {
	return useMutation({ mutationKey: ["some-key"], mutationFn: action });
}
