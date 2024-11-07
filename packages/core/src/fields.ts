import {
	CheckboxField,
	ColorField,
	EmailField,
	ImageField,
	NumberField,
	PasswordField,
	RelationshipField,
	RichTextField,
	SelectField,
	TextField,
} from "@melony/types";

export const textField = (config?: TextField): TextField => {
	return {
		type: "text",
		...config,
	};
};

export const numberField = (config?: NumberField): NumberField => {
	return {
		type: "number",
		...config,
	};
};

export const checkboxField = (config?: CheckboxField): CheckboxField => {
	return {
		type: "checkbox",
		...config,
	};
};

export const relationshipField = (
	config?: RelationshipField,
): RelationshipField => {
	return {
		type: "relationship",
		...config,
	};
};

export const colorField = (config?: ColorField): ColorField => {
	return {
		type: "color",
		...config,
	};
};

export const selectField = (config?: SelectField): SelectField => {
	return {
		type: "select",
		...config,
	};
};

export const richTextField = (config?: RichTextField): RichTextField => {
	return {
		type: "rich",
		...config,
	};
};

export const imageField = (config?: ImageField): ImageField => {
	return {
		type: "image",
		...config,
	};
};

export const emailField = (config?: EmailField): EmailField => {
	return {
		type: "email",
		...config,
	};
};

export const passwordField = (config?: PasswordField): PasswordField => {
	return {
		type: "password",
		...config,
	};
};
