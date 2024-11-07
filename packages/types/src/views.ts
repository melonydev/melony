import { BaseContext } from "./config";
import { ButtonElement, TabElement } from "./elements";
import { Field } from "./fields";
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
// export type ListViewParams = {
// 	q?: string;
// 	filter?: FilterItem[];
// 	sort?: {
// 		id: string;
// 		desc: boolean;
// 	}[];
// 	paginate?: { pageIndex: number; pageSize: number };
// };
export type ListViewAction = (ctx: BaseContext) => Promise<ListViewResponse>;
export type ListViewProps = BaseView & {
	type: "list";
	action: ListViewAction | string;
	onItemClick?: {
		viewId: string;
	};
	headerButtons?: ButtonElement[];
	itemButtons?: ButtonElement[];
};

// DETAIL VIEW
export type DetailViewResponse = Record<string, unknown>;
export type DetailViewAction = (
	ctx: BaseContext,
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
export type FormViewAction = (payload: {
	id: any;
	data: any;
}) => Promise<FormViewResponse>;
export type FormViewProps = BaseView & {
	type: "form";
	action: FormViewAction;
	getDefaultValues?: (ctx: BaseContext) => Promise<any>;
};

// CHAT VIEW
export type ChatViewProps = BaseView & {
	type: "chat";
	getInitialMessagesAction: (ctx: BaseContext) => any;
	action?: string;
};

// VIEW
export type View =
	| ListViewProps
	| DetailViewProps
	| FormViewProps
	| ChatViewProps;

// TODO: NEEDS TO BE REMOVED
//
//
//
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
