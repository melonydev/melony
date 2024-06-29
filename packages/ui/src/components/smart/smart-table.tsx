import React from "react";
import { Action, Field, FilterItem, Resource } from "@melony/types";

import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useList } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { AdvancedFilter } from "../advanced-filter";
import { Actions } from "./actions";
import { ViewDocDialog } from "./view-doc-dialog";
import { CreateDocDialog } from "./create-doc-dialog";
import { useApp } from "../providers/app-provider";
import { DEFAULT_FIELD_UI_COMPONENTS } from "./default-field-ui-components";
import { useQuery } from "@tanstack/react-query";

const generateColumnsFromFields = (fields: Field[]) => {
	const result: ColumnDef<
		{
			[x: string]: {};
		},
		unknown
	>[] = [];

	result.push({
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				onClick={(e) => {
					e.stopPropagation();
				}}
			/>
		),
		enableSorting: false,
		enableHiding: false,
		size: 48,
	});

	fields.map((field) => {
		result.push({
			accessorKey: field.name,
			cell: ({ row }) => {
				const Comp =
					field?.components?.display ||
					DEFAULT_FIELD_UI_COMPONENTS[field?.type || "text"].display;

				return <Comp field={field} defaultValue={row.getValue(field.name)} />;
			},
		});
	});

	return result;
};

export function SmartTable({
	resource,
	initialFilter,
	queryAction,
	headerActions = [],
	fields,
}: {
	resource: Resource;
	initialFilter?: FilterItem[];
	queryAction: Action;
	headerActions?: Action[];
	fields: Field[];
}) {
	const { redirectAction } = useApp();

	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "update" | "create";
		data?: any;
	} | null>(null);

	const [rowSelection, setRowSelection] = React.useState({});

	const [filter, setFilter] = React.useState<FilterItem[]>(initialFilter || []);

	const {
		data = [],
		isLoading,
		error,
	} = useList({
		resource,
		filter,
	});

	const { data: dataFromAction } = useQuery({
		queryKey: ["list-from-action"],
		queryFn: () => queryAction.handler({}),
	});

	const actions = resource?.actions || [];

	return (
		<div id="table" className="h-full flex flex-col">
			<div className="flex justify-between items-center py-2.5 border-b">
				<div className="flex items-center gap-2">
					<Input placeholder="Search..." />
					<AdvancedFilter
						resource={resource}
						values={filter}
						onChange={(filter) => {
							setFilter(filter);
						}}
					/>
					<Actions
						resource={resource}
						actions={actions}
						docs={data.filter((_: any, index: number) =>
							Object.keys(rowSelection).includes(`${index}`),
						)}
					/>
				</div>
				<div className="flex items-center gap-2">
					{/* <Button
						onClick={() => {
							setActiveDoc({ mode: "create" });
						}}
					>
						<PlusIcon className="w-4 h-4 mr-2" />
						Create
					</Button> */}

					{headerActions.map((headerAction) => {
						return (
							<Button
								onClick={() => {
									setActiveDoc({ mode: "create" });
								}}
							>
								{headerAction?.name || headerAction.key}
							</Button>
						);
					})}
				</div>
			</div>

			<div className="flex-1">
				<DataTable
					columns={generateColumnsFromFields(fields || [])}
					data={data}
					isLoading={isLoading}
					onClickRow={(data) => {
						// redirectAction(`/${resource.model}/${data.id}`);

						setActiveDoc({ mode: "update", data });
					}}
					onSelect={setRowSelection}
				/>
			</div>

			<CreateDocDialog
				resource={resource}
				open={activeDoc?.mode === "create"}
				onClose={() => {
					setActiveDoc(null);
				}}
			/>

			<ViewDocDialog
				resource={resource}
				data={activeDoc?.data}
				open={activeDoc?.mode === "update"}
				onClose={() => {
					setActiveDoc(null);
				}}
			/>
		</div>
	);
}
