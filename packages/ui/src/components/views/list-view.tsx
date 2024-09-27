import React from "react";
import {
	BaseContext,
	Field,
	FilterItem,
	ListView as ListViewTD,
} from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { useApp } from "../providers/app-provider";
import {
	ColumnDef,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";
import { DEFAULT_COMPONENTS_MAP, DEFAULT_PAGE_SIZE } from "@/constants";
import { ActionsDropdownMenu } from "../actions/actions-dropdown-menu";
import { HeaderButtons } from "../actions/header-buttons";
import { AdvancedFilter } from "../advanced-filter";
import { Button } from "../ui/button";
import { ArrowDownIcon, ArrowDownUpIcon, ArrowUpIcon } from "lucide-react";

const convertFieldsToColumns = (
	viewId: string,
	fields: Record<string, Field>,
) => {
	const columns: ColumnDef<any, any>[] = Object.keys(fields).map((fieldKey) => {
		let realFieldKey = fieldKey;

		const field = fields?.[fieldKey] || {
			type: "text",
			label: "",
			components: { form: null },
			sortable: false,
		};

		if (field.type === "relationship" && field?.displayField) {
			realFieldKey = field.displayField;
		}

		return {
			header: ({ column }) => (
				<div className="flex items-center gap-2 justify-between">
					{field?.label || realFieldKey}

					{field?.sortable && (
						<Button
							onClick={() => column.toggleSorting()}
							variant="ghost"
							size="icon"
						>
							{column.getIsSorted() === "desc" ? (
								<ArrowDownIcon
									className="size-3.5 text-muted-foreground/70"
									aria-hidden="true"
								/>
							) : column.getIsSorted() === "asc" ? (
								<ArrowUpIcon
									className="size-3.5 text-muted-foreground/70"
									aria-hidden="true"
								/>
							) : (
								<ArrowDownUpIcon
									className="size-3.5 text-muted-foreground/70"
									aria-hidden="true"
								/>
							)}
						</Button>
					)}
				</div>
			),
			accessorKey: fieldKey,
			cell: ({ row }) => {
				let Comp =
					field?.components?.form ||
					DEFAULT_COMPONENTS_MAP[field?.type || "text"].display;

				let value = row.original?.[realFieldKey];

				console.log("value", value);

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

	const [filterValues, setFilterValues] = React.useState<FilterItem[]>([]);

	const [{ pageIndex, pageSize }, setPagination] =
		React.useState<PaginationState>({
			pageIndex: 0,
			pageSize: DEFAULT_PAGE_SIZE,
		});

	const pagination = React.useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize],
	);

	const [sorting, setSorting] = React.useState<SortingState>([]);

	const memoizedFilterValues = React.useMemo(
		() => filterValues,
		[filterValues],
	);

	const view = config?.views?.[viewId] as ListViewTD;
	const fields = view?.fields || {};

	const filterableFilters = Object.fromEntries(
		Object.entries(fields).filter(([_, field]) => field.filterable),
	);

	const { data, isLoading } = useQuery({
		queryKey: [viewId, ctx, memoizedFilterValues, pagination, sorting],
		queryFn: () =>
			view?.action({
				filter: [...(ctx?.initialFilter || []), ...filterValues],
				paginate: pagination,
				sort: sorting,
			}),
	});

	if (!view) return null;

	return (
		<div className="flex flex-col h-full">
			<div className="py-1 px-3 flex items-center gap-2">
				<HeaderButtons viewId={viewId} />

				{Object.keys(filterableFilters).length > 0 && (
					<AdvancedFilter
						fields={filterableFilters}
						initialValues={filterValues}
						onChange={setFilterValues}
					/>
				)}
			</div>

			<div className="flex-1 flex flex-col">
				<DataTable<any, any>
					columns={convertFieldsToColumns(viewId, fields)}
					data={data?.items || []}
					isLoading={isLoading}
					pagination={pagination}
					sorting={sorting}
					total={data?.meta?.total || 0}
					onClickRow={(item) => {
						navigate(`/${view?.onItemClick?.viewId}?id=${item.id}`);
					}}
					onPaginationChange={setPagination}
					onSortingChange={setSorting}
				/>
			</div>
		</div>
	);
}
