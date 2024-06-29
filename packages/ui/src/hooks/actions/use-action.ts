import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Action, CustomActionPayload, Model, Resource } from "@melony/types";

export function useAction({
	resource,
	action,
}: {
	resource: Resource;
	action: Action;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [`action-${action.name}`],
		mutationFn: (props: CustomActionPayload) => action.handle(props),
		onSuccess: () => {},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [resource.path] });
		},
	});
}
