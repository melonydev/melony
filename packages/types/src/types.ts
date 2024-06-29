// export type DBField = {
// 	type: string;
// 	kind: string;
// 	name: string;
// 	isRequired: boolean;
// 	isList: boolean;
// 	isUnique: boolean;
// 	isId: boolean;
// 	isReadOnly: boolean;
// 	default?: unknown;
// 	isDisplayField?: boolean;
// 	relationFromFields?: string[];
// 	relationModel?: string;
// 	options?: { label: string; value: any }[];
// 	component?: "Document" | "Image" | "Color";
// 	documentation?: string | undefined;
// };

// models
export type Model = {
	name: string;
	fields?: Field[];
	actions?: Action[];
};

// fields
export type BaseField = {
	name: string;
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
	relationFromFields?: string[];
	relatedModel?: string;
	displayField?: string;
	imageField?: string;
	colorField?: string;
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

export type Field =
	| TextField
	| NumberField
	| CheckboxField
	| RelationshipField
	| ColorField
	| SelectField
	| RichTextField
	| ImageField;

// actions
export type Action = {
	key: string;
	name?: string;
	icon?: string;
	handler: (props: any) => Promise<any>;
};

// resources
export type Resource = {
	label?: string;
	model: string;
	fields: Field[];
	actions?: Action[];
};

export type UI = {
	title: string;
	logo?: any; // JSX.Element
	colors?: {
		primary: string;
		border?: string;
	};
	radius?: number;
};

export type Plugin = (config: Config) => Config;

export type Widget = {
	title: string;
	width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	actions?: Action[];
	content?: any; // react JSX element
};

// by default, page is 12 columns width
export type Page = {
	title: string;
	path: string; // page path is always 0 segment within url
	icon?: string;
	isHidden?: boolean;
	widgets?: Widget[];
};

// main configs
export type Config = {
	ui?: UI;
	pages?: Page[];
	plugins?: Plugin[];
};

// auth
export type User = {
	id: string;
	email: string;
	image?: string;
	name?: string;
};

// in-built actions
export type LoginActionPayload = {
	email: string;
	password: string;
};

export type ListActionPayload = {
	resource: Resource;
	filter?: FilterItem[];
};

export type GetActionPayload = {
	resource: Resource;
	where: any;
};

export type CreateActionPayload = {
	resource: Resource;
	data: any;
};

export type UpdateActionPayload = {
	resource: Resource;
	data: any;
};

export type DeleteActionPayload = {
	resource: Resource;
	where: any;
};

// filters
export type FilterItem = {
	field: string;
	operator: "Is" | "Contains" | "DoesNotContain" | "IsAnyOf" | "GeoWithinBox";
	value: any;
};
