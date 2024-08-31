import { Field } from "@melony/types";
import { z } from "zod";

export function getFieldValidation(field: Field): z.ZodType {
	let zodType: z.ZodType = z.unknown(); // Default to unknown for flexibility

	switch (field.type) {
		case "number":
			zodType = z.number();
			break;
		case "text":
		case "password":
			zodType = z.string();
			break;
		case "email":
			zodType = z.string().email();
			break;
		case "checkbox":
			zodType = z.boolean();
			break;
		case "rich":
			zodType = z.string();
			break;
		default:
			console.warn(`Unsupported field type: ${field.type}`);
			break;
	}

	// Handle optional fields using `?`
	if (!field.isRequired) {
		zodType = zodType.optional().nullish(); // nullish is needed because that input is null when doc is created with optional fields
	} else if (field.hasOwnProperty("default")) {
		// Handle fields with defaults (optional for flexibility)
		zodType = zodType.default(field.default);
	}

	// ID is always optional because we expect to always autogenerate it.
	if (field.isId) {
		zodType = zodType.optional();
	}

	return zodType;
}
