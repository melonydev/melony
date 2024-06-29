import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../..";
import { Resource } from "@melony/types";

export function useUpdate({
	resource,
	onSuccess,
}: {
	resource: Resource;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { updateAction } = useApp();

	return useMutation({
		mutationKey: ["update"],
		mutationFn: (data: any) => updateAction({ resource, data }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [resource.model] });
		},
	});
}
