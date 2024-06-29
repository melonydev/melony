import { Field, FilterItem, Model, Resource } from "@melony/types";
import { Prisma } from "@prisma/client";

const getFieldType = (field: any): Field["type"] => {
	if (field?.kind === "object") return "relationship";
	if (field?.type === "Boolean") return "checkbox";
	if (field?.type === "Int") return "number";
	if (field?.type === "Float") return "number";

	return "text";
};

export const generateModels = (): Model[] => {
	const enums = Prisma.dmmf.datamodel.enums;

	// console.log(Prisma.dmmf.datamodel.models.map((model) => console.log(model)));

	return Prisma.dmmf.datamodel.models.map((model) => {
		const modelOptions = parseStringOptions(model?.documentation);

		return {
			name: model.name,
			layout: modelOptions?.layout as any,
			fields: model.fields.map((field) => {
				const options = parseStringOptions(field?.documentation);
				const fieldType = getFieldType(field);

				return {
					name: field.name,
					isRequired: field.isRequired,
					isList: field.isList,
					isUnique: field.isUnique,
					isId: field.isId,
					isReadOnly: field.isReadOnly,
					type: fieldType,
					documentation: field?.documentation,
					relationFromFields: field?.relationFromFields
						? [...field?.relationFromFields]
						: undefined,
					relatedModel: fieldType === "relationship" ? field?.type : undefined,
					isDisplayField: options?.displayField as boolean,
					options:
						field.kind === "enum"
							? enums
									.find((x) => x.name === field.type)
									?.values?.map((value) => ({
										label: value.name,
										value: value.name,
									}))
							: undefined,
				};
			}),
		};
	});
};

type ParsedOptions = { [key: string]: string | boolean };

export function parseStringOptions(str?: string): ParsedOptions {
	const options: ParsedOptions = {};
	if (!str) return options;

	for (const option of str.split(/\s+/)) {
		const [key, value] = option.split("=");

		// Handle case with no value (key is treated as a truthy value)
		options[key as string] = value === undefined ? true : value;
	}

	return options;
}

export function buildWhere(filters: FilterItem[]): Record<string, any> {
	const whereClause: Record<string, any> = {};
	for (const filterItem of filters) {
		const { field, operator, value } = filterItem;

		if (value !== "") {
			switch (operator) {
				case "Contains":
					whereClause[field] = { contains: value };
					break;
				case "Is":
					whereClause[field] = value;
					break;
				default:
					throw new Error(`Unsupported operator: ${operator}`);
			}
		}
	}
	return whereClause;
}

export const buildInclude = (resource?: Resource) => {
	if (!resource) return undefined;

	return (resource?.fields || [])
		.filter((x) => x.type === "relationship")
		.reduce<Record<string, any>>((prev, curr) => {
			if (curr)
				prev[curr.name.toLowerCase()] = curr?.isList ? { take: 3 } : true;

			return prev;
		}, {});
};
