import { ID } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { Page, PageBody, PageHeader } from "../page";
import { Label } from "../ui/label";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { ActionsDropdownMenu } from "../actions/actions-dropdown-menu";
import { useApp } from "../providers/app-provider";

export function DocPage({
	resourceId,
	id,
	ctx,
}: {
	resourceId: string;
	id: ID;
	ctx: any;
}) {
	const { config } = useApp();

	const resource = config?.resources?.[resourceId];
	const action = resource?.actions?.read;

	const { data, isLoading } = useQuery({
		queryKey: [resourceId, "read", id],
		queryFn: () => action?.execute({ id }),
	});

	if (isLoading) return <>Loading...</>;

	const fields = action?.fields || {};

	if (!resource) return null;

	return (
		<Page>
			<PageHeader
				title={`${resource?.title || resourceId} • Show`}
				description={resource?.description}
				actions={
					<div className="flex items-center gap-2">
						<ActionsDropdownMenu resourceId={resourceId} data={data} />
					</div>
				}
			/>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<div className="flex flex-col gap-4">
						{Object.keys(fields).map((fieldKey) => {
							const field = fields[fieldKey];

							if (!field) return null;

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
		</Page>
	);
}
