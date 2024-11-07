import { chatView } from "melony";
import { getInitialMessagesAction } from "../actions/conversations";

export const newChatView = chatView({
	title: "New Chat",
	icon: "PlusIcon",
	showInNavigation: true,
	getInitialMessagesAction,
});

export const historyChatView = chatView({
	title: "History Chat",
	getInitialMessagesAction,
	action: "/api/chat",
});
