// main configs
export type AppConfig = {
	title: string;
	ui?: UI;
	auth?: Auth;
	resources?: Resource[];
};

export type Auth = {
	actions: AuthAction[];
};

export type ID = string | number;

export type SelectOption = {
	label: string;
	value: string;
	image?: string;
	color?: string;
};

// resources
export type Resource = {
	id: string;
	title?: string;
	description?: string;
	fields?: Field[];
	actions?: Action[];
};

// widgets
export type BaseWidget = {
	title?: string;
	description?: string;
	width?: "sm" | "md" | "lg";
};

// fields
export type BaseField = {
	key: string;
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
	handler: ({ q }: { q: string }) => Promise<SelectOption[]>;
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

// actions
export type BaseAction = {
	id: "getList" | "getOne" | "deleteOne" | "create" | "update" | string;
	title?: string;
	description?: string;
	icon?: string;
	fields?: Field[];
};

export type ActionResponse = any;

export type GetListActionParams = {
	q?: string;
	filter?: FilterItem[];
	sort?: any;
	paginate?: any;
};
export type GetListAction = BaseAction & {
	type: "getList";
	handler: (params: GetListActionParams) => Promise<ActionResponse>;
};

export type GetOneActionParams = { id?: ID };
export type GetOneAction = BaseAction & {
	type: "getOne";
	handler: (params: GetOneActionParams) => Promise<ActionResponse>;
};

export type DeleteOneActionParams = { id?: ID };
export type DeleteOneAction = BaseAction & {
	type: "deleteOne";
	handler: (params: DeleteOneActionParams) => Promise<ActionResponse>;
};

export type CreateActionParams = { data?: any };
export type CreateAction = BaseAction & {
	type: "create";
	handler: (params: CreateActionParams) => Promise<ActionResponse>;
};

export type UpdateActionParams = { id?: ID; data?: any };
export type UpdateAction = BaseAction & {
	type: "update";
	handler: (params: UpdateActionParams) => Promise<ActionResponse>;
};

export type CustomActionParams = { id?: ID; data?: any };
export type CustomAction = BaseAction & {
	type: "custom";
	handler: (params: CustomActionParams) => Promise<ActionResponse>;
};

export type Action =
	| GetListAction
	| GetOneAction
	| DeleteOneAction
	| CreateAction
	| UpdateAction
	| CustomAction;

export type GetSuggestionsActionParams = { q: string };
export type GetSuggestionsAction = ({ q }: GetListActionParams) => Promise<any>;

export type SuggestionAction = GetSuggestionsAction;

export type LoginActionParams = {};
export type LoginAction = BaseAction & {
	type: "login";
	handler: (params: LoginActionParams) => Promise<ActionResponse>;
};

export type LogoutActionParams = {};
export type LogoutAction = BaseAction & {
	type: "logout";
	handler: (params?: LogoutActionParams) => Promise<ActionResponse>;
};

export type GetUserActionParams = { data?: any };
export type GetUserAction = BaseAction & {
	type: "getUser";
	handler: (params: GetUserActionParams) => Promise<ActionResponse>;
};

export type AuthAction = LoginAction | LogoutAction | GetUserAction;

// UI
export type UI = {
	logo?: any; // JSX.Element
	colors?: {
		primary: string;
		border?: string;
	};
	radius?: number;
	font?: {
		className: string;
		style: {
			fontFamily: string;
			fontWeight?: number;
			fontStyle?: string;
		};
	};
};

// auth
export type User = {
	id: ID;
	email: string | null;
	picture?: string;
	username?: string;
	fullName?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: number;
};

// filters
export type FilterItem = {
	field: string;
	operator: "Is" | "Contains" | "DoesNotContain" | "IsAnyOf" | "GeoWithinBox";
	value: any;
};
