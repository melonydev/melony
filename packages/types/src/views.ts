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
export type ListViewAction = (
	params: ListViewParams,
) => Promise<ListViewResponse>;
export type ListViewProps = BaseView & {
	type: "list";
	action: ListViewAction;
	onItemClick?: {
		viewId: string;
	};
	headerButtons?: ButtonElement[];
	itemButtons?: ButtonElement[];
};

// DETAIL VIEW
export type DetailViewResponse = Record<string, unknown>;
export type DetailViewParams = { id?: ID };
export type DetailViewAction = (
	params: DetailViewParams,
) => Promise<DetailViewResponse>;
export type DetailViewProps = BaseView & {
	type: "detail";
	action: DetailViewAction;
	headerButtons?: ButtonElement[];
	tabs?: TabElement[];
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
export type FormViewAction = (
	params: FormViewParams,
) => Promise<FormViewResponse>;
export type FormViewProps = BaseView & {
	type: "form";
	action: FormViewAction;
	getDefaultValues?: ({ id }: { id: ID }) => Promise<any>;
};

export type View = ListViewProps | DetailViewProps | FormViewProps;

// DEFINE VIEW
export type ViewType = View["type"];

// ViewConfig type (configuration without type and action)
export type ViewConfig<T extends ViewType> = Omit<
	Extract<View, { type: T }>,
	"type" | "action"
>;

// Updated ActionHandler type
export type ActionHandler<T extends ViewType> = T extends "list"
	? ListViewAction
	: T extends "detail"
		? DetailViewAction
		: T extends "form"
			? FormViewAction
			: never;

// Updated DefineViewFunction type
export type DefineViewFunction = <T extends ViewType>(
	type: T,
	config: ViewConfig<T>,
	actionHandler: ActionHandler<T>,
) => Extract<View, { type: T }>;
