import { useQuery } from "@tanstack/react-query";
import { useApp } from "../..";
import { GetActionPayload } from "@melony/types";

export function useGet({ resource, where }: GetActionPayload) {
	const { getAction } = useApp();

	return useQuery({
		queryKey: [resource.model, where],
		queryFn: () => getAction({ resource, where }),
	});
}
