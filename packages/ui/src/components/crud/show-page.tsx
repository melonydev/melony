import { Action, ID, Resource } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../providers/app-provider";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { Page, PageBody, PageHeader } from "../page";
import { Label } from "../ui/label";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { ActionsDropdownMenu } from "../actions/actions-dropdown-menu";
import React from "react";
import { ActionDialog } from "../actions/action-dialog";

export function Show({
	resource,
	id,
	ctx,
}: {
	resource: Resource;
	id: ID;
	ctx: any;
}) {
	const { navigate } = useApp();

	const [activeAction, setActiveAction] = React.useState<{
		action: Action;
		data: any;
	} | null>(null);

	const resourceGetOneAction = (resource?.actions || []).find(
		(x) => x.type === "getOne",
	);

	const { data, isLoading } = useQuery({
		queryKey: [resource.id, id],
		queryFn: () => resourceGetOneAction?.handler({ id }),
	});

	if (isLoading) return <>Loading...</>;

	return (
		<Page>
			<PageHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<div className="font-semibold">
							{resource?.title || resource.id} • Show
						</div>
						{resource?.description && <div>{resource.description}</div>}
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							onClick={() => {
								navigate(`/${resource.id}/edit/${id}`);
							}}
						>
							<PencilIcon className="h-4 w-4 mr-2" /> Edit
						</Button>

						<ActionsDropdownMenu
							resource={resource}
							data={data}
							onClickAction={setActiveAction}
						/>
					</div>
				</div>
			</PageHeader>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<div className="flex flex-col gap-4">
						{(resource?.fields || []).map((field) => {
							let fieldKey = field.key;

							if (field.type === "relationship" && field?.displayField) {
								fieldKey = field.displayField;
							}

							let Comp =
								field?.components?.form ||
								DEFAULT_COMPONENTS_MAP[field?.type || "text"].display;

							const value = data?.[fieldKey];

							return (
								<div key={fieldKey} className="grid grid-cols-12 items-center">
									<div className="col-span-3">
										<Label>{field?.label || fieldKey}</Label>
									</div>

									<div className="col-span-9">
										<Comp field={field} value={value} />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</PageBody>

			{!!activeAction && (
				<ActionDialog
					open={!!activeAction}
					onClose={() => {
						setActiveAction(null);
					}}
					action={activeAction.action}
					data={activeAction.data}
					id={activeAction.data?.id || "unknownId"}
				/>
			)}
		</Page>
	);
}
