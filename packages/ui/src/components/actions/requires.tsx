import { ID } from "@melony/types";
import { IdActionPage } from "./id-action-page";
import { useQuery } from "@tanstack/react-query";
import { DocProvider } from "./doc-provider";
import { useApp } from "../providers/app-provider";

export function Requires({
	children,
	resourceId,
	actionId,
	id,
}: {
	children: React.ReactNode;
	resourceId: string;
	actionId: string;
	id?: ID;
}) {
	const { config } = useApp();

	const resource = config?.resources?.[resourceId];
	const action = config?.resources?.[resourceId]?.actions?.[actionId];

	const docAction = config?.resources?.[resourceId]?.actions?.["read"];

	const { data: doc, isLoading } = useQuery({
		queryKey: [resourceId, actionId, id],
		queryFn: () => docAction?.execute({ id }),
		enabled: action?.isDocRequired || false,
	});

	if (!resource) return null;

	if (action?.isDocRequired && !id)
		return <IdActionPage resource={resource} action={action} />;

	return (
		<DocProvider doc={doc} isLoading={isLoading}>
			{children}
		</DocProvider>
	);
}
