import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../..";
import { Resource } from "@melony/types";

export function useCreate({ resource }: { resource: Resource }) {
	const queryClient = useQueryClient();

	const { createAction } = useApp();

	return useMutation({
		mutationKey: ["create"],
		mutationFn: (data: any) => createAction({ resource, data }),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [resource.model] });
		},
	});
}
