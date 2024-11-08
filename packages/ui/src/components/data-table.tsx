"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	OnChangeFn,
	PaginationState,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { cn } from "@/lib";

const defaultColumnSizing = {
	size: 180,
	minSize: 20,
	maxSize: Number.MAX_SAFE_INTEGER,
};

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	pagination?: PaginationState;
	sorting?: SortingState;
	total: number;
	onClickRow: (data: TData) => void;
	onSelect?: (old: any) => void;
	onPaginationChange?: OnChangeFn<PaginationState>;
	onSortingChange?: OnChangeFn<SortingState>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	pagination,
	sorting,
	total,
	onClickRow,
	onSelect,
	onPaginationChange,
	onSortingChange,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: (val) => {
			setRowSelection(val);
			onSelect && onSelect(val);
		},
		state: {
			rowSelection,
			pagination,
			sorting,
		},
		defaultColumn: defaultColumnSizing,
		pageCount: Math.ceil(total / (pagination?.pageSize || DEFAULT_PAGE_SIZE)),
		onPaginationChange,
		onSortingChange,
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
	});

	const renderBody = () => {
		if (isLoading)
			return Array.from([1, 2, 3]).map((item) => (
				<TableRow key={item}>
					{columns.map((col, i) => (
						<TableCell key={i}>
							<Skeleton className="h-4 w-full" />
						</TableCell>
					))}
				</TableRow>
			));

		return table.getRowModel().rows?.length ? (
			table.getRowModel().rows.map((row) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && "selected"}
					onClick={() => {
						onClickRow(row.original);
					}}
					className="cursor-pointer"
				>
					{row.getVisibleCells().map((cell, i) => (
						<TableCell key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			))
		) : (
			<TableRow>
				<TableCell colSpan={columns.length} className="h-24 text-center">
					No results.
				</TableCell>
			</TableRow>
		);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-hidden flex flex-col">
				<Table>
					<TableHeader className="top-0 rounded-t-xl z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-[transparent]">
								{headerGroup.headers.map((header, i) => {
									return (
										<TableHead
											key={header.id}
											className={cn("truncate")}
											style={{
												width:
													i === 1 &&
													header.getSize() === defaultColumnSizing.size
														? "auto"
														: header.getSize(),
											}} // considering that first column is always checkbox and second is always wider because we expect this is a main title if its not equal to default
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="overflow-auto">{renderBody()}</TableBody>
				</Table>

				<div className="p-3">
					<DataTablePagination table={table} />
				</div>
			</div>
		</div>
	);
}
