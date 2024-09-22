import { BaseContext, Field, ListView as ListViewTD } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { useApp } from "../providers/app-provider";
import { ColumnDef } from "@tanstack/react-table";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { ActionsDropdownMenu } from "../actions/actions-dropdown-menu";

const convertFieldsToColumns = (
	viewId: string,
	fields: Record<string, Field>,
) => {
	const columns: ColumnDef<any, any>[] = Object.keys(fields).map((fieldKey) => {
		const field = fields?.[fieldKey] || {
			type: "text",
			label: "",
			components: { form: null },
		};

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
	});

	columns.push({
		id: "actions",
		size: 34,
		cell: ({ row }) => {
			return <ActionsDropdownMenu viewId={viewId} data={row.original} />;
		},
	});

	return columns;
};

export function ListView({
	viewId,
	ctx,
}: {
	viewId: string;
	ctx: BaseContext;
}) {
	const { navigate, config } = useApp();

	const view = config?.views?.[viewId] as ListViewTD;

	const { data, isLoading } = useQuery({
		queryKey: [viewId, ctx],
		queryFn: () => view?.action({ filter: ctx?.initialFilter || [] }),
	});

	if (!view) return null;

	return (
		<DataTable<any, any>
			isLoading={isLoading}
			columns={convertFieldsToColumns(viewId, view?.fields || {})}
			data={data?.items || []}
			onClickRow={(item) => {
				navigate(`/${view?.onItemClick?.viewId}?id=${item.id}`);
			}}
		/>
	);
}
