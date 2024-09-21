import { ID } from "./config";
import { Field } from "./fields";
import { FilterItem } from "./filters";
import { HasAccess } from "./permissions";

export type BaseAction = {
	title?: string;
	description?: string;
	icon?: string;
	fields?: Record<string, Field>;
	isDocRequired?: boolean;
	hasAccess?: HasAccess;
};

export type ListActionResponse = {
	items: any;
	meta?: any;
};
export type ListActionParams = {
	q?: string;
	filter?: FilterItem[];
	sort?: any;
	paginate?: any;
};
export type ListAction = BaseAction & {
	type: "list";
	execute: (params: ListActionParams) => Promise<ListActionResponse>;
};

export type DocActionResponse = Record<string, unknown>;
export type DocActionParams = { id?: ID };
export type DocAction = BaseAction & {
	type: "doc";
	execute: (params: DocActionParams) => Promise<DocActionResponse>;
};

export type FormActionNavigateResponse = { type: "navigate"; path: string };
export type FormActionNotifyResponse = {
	type: "notify";
	message: string;
	isDanger?: true;
};
export type FormActionResponse =
	| FormActionNavigateResponse
	| FormActionNotifyResponse;
export type FormActionParams = { id?: ID; data?: any };
export type FormAction = BaseAction & {
	type: "form";
	execute: (params: FormActionParams) => Promise<FormActionResponse>;
};

export type Action = ListAction | DocAction | FormAction;

export type GetSuggestionsActionParams = { q: string };
export type GetSuggestionsAction = ({
	q,
}: GetSuggestionsActionParams) => Promise<any>;

export type SuggestionAction = GetSuggestionsAction;
