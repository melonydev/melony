import { Resource } from "@melony/types";

import { SmartForm } from "./smart-form";
import { useGet, useUpdate } from "@/hooks";
import { SmartTabbedRelatedLists } from "./smart-tabbed-related-lists";
import { Actions } from "./actions";
import { DocMenu } from "./doc-menu";
import { useApp } from "../providers/app-provider";

export function SmartDetailsList({
	resource,
	docId,
}: {
	resource: Resource;
	docId: string | number;
}) {
	const { models } = useApp();

	const correspondingModel = models.find((m) => m.name === resource.model);

	const idIsNumber =
		(correspondingModel?.fields || []).find((x) => x.isId)?.type === "number";

	const { data, isLoading } = useGet({
		resource,
		where: { id: idIsNumber ? Number(docId) : docId },
	});

	const { mutate: update, isPending: isUpdating } = useUpdate({
		resource,
		onSuccess: () => {},
	});

	if (isLoading) return <>Loading...</>;

	return (
		<div>
			<div className="flex justify-between items-center px-3 py-2.5 border-b">
				<div className="flex gap-1 items-center">
					<Actions
						resource={resource}
						docs={[data]}
						actions={resource?.actions || []}
					/>

					<DocMenu resource={resource} data={data} />
				</div>
				<div></div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="p-4">
					<SmartForm
						resource={resource}
						values={data}
						onSubmit={update}
						isSubmitting={isUpdating}
					/>
				</div>

				<SmartTabbedRelatedLists resource={resource} doc={data || {}} />
			</div>
		</div>
	);
}
