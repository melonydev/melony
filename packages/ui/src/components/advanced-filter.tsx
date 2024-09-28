"use client";

import React from "react";
import { Filter, Trash } from "lucide-react";
import { Field, FilterItem } from "@melony/types";
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
import { Badge } from "./ui/badge";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";

export const convertFieldsToFilterTokens = (fields: Record<string, Field>) => {
	const filterTokens: FilterTokenProps[] = [];

	Object.keys(fields).map((fieldKey) => {
		const field = fields[fieldKey];

		if (!field) return;

		if (
			["text", "checkbox", "number", "relationship"].includes(
				field?.type || "text",
			)
		) {
			filterTokens.push({
				defaultOperator: "Is",
				availableOperators: ["Is", "Contains", "DoesNotContain", "IsAnyOf"],
				// TODO: how to define Field type to have it in core and ui packages
				field: { ...field, key: fieldKey },
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
	field: Field & { key: string };
};

export type AdvancedFilterProps = {
	defaultOpen?: boolean;
	filterTokens: FilterTokenProps[];
	items: FilterItem[];
	onChange: (items: FilterItem[]) => void;
};

export function AdvancedFilter({
	fields,
	initialValues,
	onChange,
}: {
	fields: Record<string, Field>;
	initialValues: FilterItem[];
	onChange: (filter: FilterItem[]) => void;
}) {
	const [open, setOpen] = React.useState(false);

	const [localValues, setLocalValues] = React.useState(initialValues);

	const filterTokens = convertFieldsToFilterTokens(fields);

	const defaultField =
		filterTokens.find((field) => field.isDefault) || filterTokens[0];

	const handleAddFilter = () => {
		const newValues = [...localValues];
		newValues.push({
			field: defaultField?.field?.key || "",
			operator: defaultField?.defaultOperator || "Is",
			value: "",
		});
		setLocalValues(newValues);
	};

	const handleFilterChange = (idx: number, value: FilterItem) => {
		const newValues = [...localValues];
		newValues[idx] = value;
		setLocalValues([...newValues]);
	};

	const handleRemoveItem = (idx: number) => {
		const newValues = [...localValues];
		newValues.splice(idx, 1);
		setLocalValues(newValues);
	};

	const handleApply = () => {
		onChange(localValues);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline">
					{/* <Filter className="h-4 w-4 mr-2" /> */}
					Filter{" "}
					{initialValues.length > 0 && (
						<Badge className="ml-2" variant="secondary">
							{initialValues.length}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="min-w-[400px] w-auto p-0" align="start">
				{localValues.length === 0 && (
					<p className="text-sm text-foreground p-4">No filters are applied.</p>
				)}

				<div className="space-y-2 p-4">
					{localValues.map((item, i) => (
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

				<div className="p-3 flex gap-2 justify-between">
					<Button onClick={handleAddFilter} variant="outline">
						Add filter
					</Button>
					<Button
						onClick={handleApply}
						disabled={initialValues.length === 0 && localValues.length === 0}
					>
						Apply
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

	const timeoutRef = React.useRef<number | null>(null);

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		defaultValues: {
			[value.field]: value.value,
		},
	});

	const splittedField = value.field.split("."); // if there is like task.id split and use just a task
	const currentField = filterTokens.find(
		(x) => x.field.key === splittedField[0],
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

	React.useEffect(() => {
		const subscription = form.watch((value, { name, type }) => {
			if (type === "change") {
				form.handleSubmit(onSubmit)();
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [form, onSubmit]);

	let Comp =
		currentField?.field?.components?.form ||
		DEFAULT_COMPONENTS_MAP[currentField?.field?.type || "text"].form;

	function onSubmit(data?: any) {
		const key = (Object.keys(data)?.[0] || "") as string;
		const value = data[key];

		handleValueChange(key, value);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex items-center gap-2 mb-2">
					<div className="w-36">
						<Select
							value={currentField?.field.key}
							onValueChange={(value) => handleChangeField(value)}
						>
							<SelectTrigger className="w-full h-10">
								<SelectValue placeholder="pl" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{filterTokens.map((token) => {
										return (
											<SelectItem key={token.field.key} value={token.field.key}>
												{token.field?.key || "unknown"}
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
						<Comp
							fieldKey={currentField?.field?.key}
							field={currentField?.field}
							simple
						/>
					</div>

					<Button type="button" onClick={() => onRemove()} variant="ghost">
						<Trash className="h-4 w-4" />
					</Button>
				</div>
			</form>
		</Form>
	);
}
