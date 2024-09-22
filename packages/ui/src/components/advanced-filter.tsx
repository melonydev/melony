"use client";

import React from "react";
import { Filter, Trash } from "lucide-react";
import { Field, FilterItem, Model, Resource } from "@melony/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export const convertFieldsToFilterTokens = (fields: Field[]) => {
	const filterTokens: FilterTokenProps[] = [];

	fields.map((field) => {
		if (["text", "checkbox", "number"].includes(field.type || "")) {
			filterTokens.push({
				defaultOperator: "Contains",
				availableOperators: ["Is", "Contains", "DoesNotContain", "IsAnyOf"],
				// TODO: how to define Field type to have it in core and ui packages
				field,
			});
		}
	});

	// filter by type only fields can be used in Filter UI
	return filterTokens;
};

export type FilterTokenProps = {
	isDefault?: boolean;
	defaultOperator?: FilterItem["operator"];
	availableOperators?: FilterItem["operator"][];
	field: Field;
};

export type AdvancedFilterProps = {
	defaultOpen?: boolean;
	filterTokens: FilterTokenProps[];
	items: FilterItem[];
	onChange: (items: FilterItem[]) => void;
};

export function AdvancedFilter({
	resource,
	values,
	onChange,
}: {
	resource: Resource;
	values: FilterItem[];
	onChange: (filter: FilterItem[]) => void;
}) {
	const [open, setOpen] = React.useState(false);

	const filterTokens = convertFieldsToFilterTokens(resource?.fields || []);

	const defaultField =
		filterTokens.find((field) => field.isDefault) || filterTokens[0];

	const handleAddFilter = () => {
		const newValues = [...values];
		newValues.push({
			field: defaultField?.field?.path || "",
			operator: defaultField?.defaultOperator || "Contains",
			value: "",
		});
		onChange(newValues);
	};

	const handleFilterChange = (idx: number, value: FilterItem) => {
		const newValues = [...values];
		newValues[idx] = value;
		onChange([...newValues]);
	};

	const handleRemoveItem = (idx: number) => {
		const newValues = [...values];
		newValues.splice(idx, 1);
		onChange(newValues);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<Filter className="h-4 w-4 mr-2" />
					Filter{" "}
					{values.length > 0 && (
						<Badge className="ml-2" variant="secondary">
							{values.length}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0" align="start">
				{values.length === 0 && (
					<p className="text-sm text-foreground p-4">No filters are applied.</p>
				)}

				<div className="space-y-2 p-4">
					{values.map((item, i) => (
						<AdvancedFilterItem
							key={i}
							filterTokens={filterTokens}
							value={item}
							onChange={(val) => {
								handleFilterChange(i, val);
							}}
							onRemove={() => {
								handleRemoveItem(i);
							}}
						/>
					))}
				</div>

				<div className="p-3">
					<Button onClick={handleAddFilter} variant="outline" size="sm">
						Add filter
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

type FilterItemProps = {
	value: FilterItem;
	filterTokens: FilterTokenProps[];
	onChange: (value: FilterItem) => void;
	onRemove: () => void;
	useSuggestions?: any;
	useGetMembers?: any;
	projectId?: string;
};

export function AdvancedFilterItem(props: FilterItemProps) {
	const { onChange, filterTokens, onRemove, value } = props;

	const splittedField = value.field.split("."); // if there is like task.id split and use just a task
	const currentField = filterTokens.find(
		(x) => x.field.path === splittedField[0],
	);

	const handleChangeField = (field: string) => {
		let val = value.value;

		// TODO: we need to set checkbox to false by default
		if (currentField?.field?.type === "checkbox") {
			val = false;
		}

		onChange({
			...value,
			field,
			value: val,
		});
	};

	const handleValueChange = (field: string, val: any) => {
		onChange({
			...value,
			field,
			value: val,
		});
	};

	const handleChangeOperator = (operator: FilterItem["operator"]) => {
		onChange({
			...value,
			operator,
		});
	};

	return (
		<div className="flex items-center gap-2 mb-2">
			<div className="w-36">
				<Select
					value={currentField?.field.path}
					onValueChange={(value) => handleChangeField(value)}
				>
					<SelectTrigger className="w-full h-10">
						<SelectValue placeholder="pl" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{filterTokens.map((token) => {
								return (
									<SelectItem key={token.field.path} value={token.field.path}>
										{token.field?.path || "unknown"}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="w-24">
				<Select
					value={value.operator}
					onValueChange={(value) =>
						handleChangeOperator(value as FilterItem["operator"])
					}
				>
					<SelectTrigger className="w-full h-10">
						<SelectValue placeholder="pl" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{(currentField?.availableOperators || ["Contains"]).map(
								(operator) => {
									return (
										<SelectItem key={operator} value={operator}>
											{operator}
										</SelectItem>
									);
								},
							)}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Input
					value={value.value}
					onChange={(e) => {
						handleValueChange(value.field, e.target.value);
					}}
				/>
			</div>

			<Button onClick={() => onRemove()} variant="ghost">
				<Trash className="h-4 w-4" />
			</Button>
		</div>
	);
}
