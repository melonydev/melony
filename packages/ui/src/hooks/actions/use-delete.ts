import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../..";
import { Resource } from "@melony/types";

export function useDelete({
	resource,
	onSuccess,
}: {
	resource: Resource;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { deleteAction } = useApp();

	return useMutation({
		mutationKey: ["delete"],
		mutationFn: (where: any) => deleteAction({ resource, where }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [resource.model] });
		},
	});
}
