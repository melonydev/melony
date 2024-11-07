import {
	DetailViewProps,
	FormViewProps,
	ListViewProps,
	ChatViewProps,
} from "@melony/types";

export const listView = (
	config: Omit<ListViewProps, "type">,
): ListViewProps => {
	return {
		type: "list",
		...config,
	};
};

export const formView = (
	config: Omit<FormViewProps, "type">,
): FormViewProps => {
	return {
		type: "form",
		...config,
	};
};

export const detailView = (
	config: Omit<DetailViewProps, "type">,
): DetailViewProps => {
	return {
		type: "detail",
		...config,
	};
};

export const chatView = (
	config: Omit<ChatViewProps, "type">,
): ChatViewProps => {
	return {
		type: "chat",
		...config,
	};
};
