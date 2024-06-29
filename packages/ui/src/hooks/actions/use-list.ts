import { useQuery } from "@tanstack/react-query";
import { useApp } from "../..";
import { ListActionPayload } from "@melony/types";

export function useList({ resource, filter }: ListActionPayload) {
	const { listAction } = useApp();

	return useQuery({
		queryKey: [resource.model, filter],
		queryFn: () => listAction({ resource, filter }),
	});
}
