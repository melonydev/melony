import { Action, Field, Resource } from "@melony/types";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { useApp } from "../providers/app-provider";
import { PlusIcon } from "lucide-react";
import { Page, PageBody, PageHeader } from "../page";
import { ColumnDef } from "@tanstack/react-table";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { ActionsDropdownMenu } from "../actions/actions-dropdown-menu";
import { ActionDialog } from "../actions/action-dialog";
import React from "react";

const convertFieldsToColumns = (
	resource: Resource,
	onClickAction: (params: { action: Action; data: any }) => void,
) => {
	const columns: ColumnDef<any, any>[] = (resource?.fields || []).map(
		(field) => {
			let fieldKey = field.key;

			if (field.type === "relationship" && field?.displayField) {
				fieldKey = field.displayField;
			}

			return {
				header: field?.label || fieldKey,
				accessorKey: fieldKey,
				cell: ({ row }) => {
					let Comp =
						field?.components?.form ||
						DEFAULT_COMPONENTS_MAP[field?.type || "text"].display;

					let value = row.getValue(fieldKey);

					return <Comp field={field} value={value} />;
				},
			};
		},
	);

	columns.push({
		id: "actions",
		size: 34,
		cell: ({ row }) => {
			return (
				<ActionsDropdownMenu
					resource={resource}
					onClickAction={onClickAction}
					data={row.original}
				/>
			);
		},
	});

	return columns;
};

export function List({ resource, ctx }: { resource: Resource; ctx: any }) {
	const { navigate } = useApp();

	const [activeAction, setActiveAction] = React.useState<{
		action: Action;
		data: any;
	} | null>(null);

	const resourceGetListAction = (resource?.actions || []).find(
		(x) => x.type === "getList",
	);

	const { data, isLoading } = useQuery({
		queryKey: [resource.id],
		queryFn: () => resourceGetListAction?.handler({}),
	});

	return (
		<Page>
			<PageHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<div className="font-semibold">
							{resource?.title || resource.id}
						</div>
						{resource?.description && <div>{resource.description}</div>}
					</div>

					<div>
						<Button
							onClick={() => {
								navigate(`/${resource.id}/create`);
							}}
						>
							<PlusIcon className="h-4 w-4 mr-2" /> Create
						</Button>
					</div>
				</div>
			</PageHeader>

			<PageBody>
				<DataTable<any, any>
					isLoading={isLoading}
					columns={convertFieldsToColumns(resource, setActiveAction)}
					data={data?.rows || []}
					onClickRow={(item) => {
						navigate(`/${resource.id}/show/${item.id}`);
					}}
				/>
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
