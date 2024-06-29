"use client";

import { Combobox, SelectOption } from "../ui/combobox";
import { useList } from "@/hooks";
import { FormFieldProps } from "./types";
import { Avatar, AvatarImage } from "../ui/avatar";
import { RelationshipField } from "@melony/types";

export function FormCombobox({
	field: initialField,
	formFieldProps,
}: FormFieldProps) {
	const field = initialField as RelationshipField;

	const { data = [], isLoading } = useList({
		resource: { model: field?.relatedModel || "unknown", fields: [] },
	});

	const options: SelectOption[] = data.map((item: any) => {
		const imageSrc =
			item?.[field?.imageField || "fieldDoesntExist"] ||
			item?.image ||
			item?.logo ||
			item?.avatar ||
			item?.icon;

		const colorCode =
			item?.[field?.colorField || "fieldDoesntExist"] || item?.color;

		let Icon: React.ReactNode;

		if (imageSrc) {
			Icon = (
				<Avatar className="w-4 h-4 mr-2">
					<AvatarImage src={imageSrc} />
				</Avatar>
			);
		}

		if (colorCode) {
			Icon = (
				<div
					className="w-3 h-3 rounded-full mr-2"
					style={{ backgroundColor: colorCode }}
				/>
			);
		}

		const label =
			item?.[field?.displayField || "fieldDoesntExist"] ||
			item?.title ||
			item?.name ||
			item?.email ||
			item?.id;

		return {
			value: `${item.id}`, // make it always string
			label,
			icon: Icon,
		};
	});

	return (
		<Combobox
			options={options}
			value={`${formFieldProps.value}`} // make it always string
			onChange={(val) => {
				formFieldProps.onChange(val);
			}}
			isLoading={isLoading}
		/>
	);
}
