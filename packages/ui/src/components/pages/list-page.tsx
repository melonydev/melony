import { Field } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { useApp } from "../providers/app-provider";
import { Page, PageBody, PageHeader } from "../page";
import { ColumnDef } from "@tanstack/react-table";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { ActionsDropdownMenu } from "../actions/actions-dropdown-menu";
import { ActionsStack } from "../actions/actions-stack";

const convertFieldsToColumns = (
	resourceId: string,
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
			return (
				<ActionsDropdownMenu resourceId={resourceId} data={row.original} />
			);
		},
	});

	return columns;
};

export function ListPage({
	resourceId,
	ctx,
}: {
	resourceId: string;
	ctx: any;
}) {
	const { navigate, config } = useApp();

	const resource = config?.resources?.[resourceId];
	const action = resource?.actions?.list;

	const { data, isLoading } = useQuery({
		queryKey: [resourceId, "list"],
		queryFn: () => action?.execute({}),
	});

	if (!resource) return null;

	return (
		<Page>
			<PageHeader
				title={`${resource?.title || resourceId} • List`}
				description={resource?.description}
				actions={<ActionsStack resourceId={resourceId} />}
			/>

			<PageBody>
				<DataTable<any, any>
					isLoading={isLoading}
					columns={convertFieldsToColumns(resourceId, action?.fields || {})}
					data={data?.items || []}
					onClickRow={(item) => {
						navigate(`/${resourceId}/read/${item.id}`);
					}}
				/>
			</PageBody>
		</Page>
	);
}
