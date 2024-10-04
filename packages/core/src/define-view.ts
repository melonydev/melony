import {
	DefineViewFunction,
	DetailViewProps,
	FormViewProps,
	ListViewProps,
} from "@melony/types";

export const defineView: DefineViewFunction = (type, config, action) => {
	return {
		type,
		...config,
		action,
	} as Extract<
		ListViewProps | DetailViewProps | FormViewProps,
		{ type: typeof type }
	>;
};
