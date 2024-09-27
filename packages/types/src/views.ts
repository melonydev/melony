import { ID } from "./config";
import { ButtonElement, TabElement } from "./elements";
import { Field } from "./fields";
import { FilterItem } from "./filters";
import { HasAccess } from "./permissions";

// BASE VIEW
export type BaseView = {
	title?: string;
	description?: string;
	icon?: string;
	fields?: Record<string, Field>;
	isDocRequired?: boolean;
	hasAccess?: HasAccess;
	showInNavigation?: boolean;
};

// LIST VIEW
export type ListViewResponse = {
	items: any;
	meta?: { total: number };
};
export type ListViewParams = {
	q?: string;
	filter?: FilterItem[];
	sort?: {
		id: string;
		desc: boolean;
	}[];
	paginate?: { pageIndex: number; pageSize: number };
};
export type ListView = BaseView & {
	type: "list";
	onItemClick?: {
		viewId: string;
	};
	headerButtons?: ButtonElement[];
	itemButtons?: ButtonElement[];
	action: (params: ListViewParams) => Promise<ListViewResponse>;
};

// DETAIL VIEW
export type DetailViewResponse = Record<string, unknown>;
export type DetailViewParams = { id?: ID };
export type DetailView = BaseView & {
	type: "detail";
	headerButtons?: ButtonElement[];
	tabs?: TabElement[];
	action: (params: DetailViewParams) => Promise<DetailViewResponse>;
};

// FORM VIEW
export type FormViewNavigateResponse = { type: "navigate"; path: string };
export type FormViewNotifyResponse = {
	type: "notify";
	message: string;
	isDanger?: true;
};
export type FormViewResponse =
	| FormViewNavigateResponse
	| FormViewNotifyResponse;
export type FormViewParams = { id?: ID; data?: any };
export type FormView = BaseView & {
	type: "form";
	getDefaultValues?: ({ id }: { id: ID }) => Promise<any>;
	action: (params: FormViewParams) => Promise<FormViewResponse>;
};

export type View = ListView | DetailView | FormView;
