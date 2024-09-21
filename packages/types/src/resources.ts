import { Action, DocAction, FormAction, ListAction } from "./actions";
import { HasAccess } from "./permissions";

export type Resource = {
	title?: string;
	description?: string;
	actions?: {
		list?: ListAction;
		create?: FormAction;
		read?: DocAction;
		update?: FormAction;
		delete?: FormAction;
		[key: string]: Action | undefined;
	};
	showInNavigation?: boolean;
	hasAccess?: HasAccess;
};
