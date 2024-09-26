import { SelectOption } from "./config";
import { HasAccess } from "./permissions";

export type BaseField = {
	label?: string;
	description?: string;
	isRequired?: boolean;
	isList?: boolean;
	isUnique?: boolean;
	isId?: boolean;
	isReadOnly?: boolean;
	default?: unknown;
	isDisplayField?: boolean;
	documentation?: string | undefined;
	components?: {
		display: any;
		form: any;
	};
	hasAccess?: HasAccess;
	filterable?: boolean;
};

export type TextField = BaseField & {
	type?: "text";
	maxLength?: number;
	minLength?: number;
};

export type NumberField = BaseField & {
	type?: "number";
	max?: number;
	min?: number;
};

export type CheckboxField = BaseField & {
	type?: "checkbox";
};

export type ColorField = BaseField & {
	type?: "color";
};

export type RelationshipField = BaseField & {
	type?: "relationship";
	getSuggestions?: ({ q }: { q: string }) => Promise<SelectOption[]>;
	valueAsNumber?: boolean;
	displayField?: string;
	titleKey?: string;
	colorKey?: string;
	imageKey?: string;
};

export type SelectField = BaseField & {
	type?: "select";
	options?: { label: string; value: any }[];
};

export type RichTextField = BaseField & {
	type?: "rich";
};

export type ImageField = BaseField & {
	type?: "image";
};

export type EmailField = BaseField & {
	type?: "email";
};

export type PasswordField = BaseField & {
	type?: "password";
};

export type Field =
	| TextField
	| NumberField
	| CheckboxField
	| RelationshipField
	| ColorField
	| SelectField
	| RichTextField
	| ImageField
	| EmailField
	| PasswordField;
