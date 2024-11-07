import { defineView, relationshipField, textField } from "melony";
import {
	getMessagesAction,
	getOneConversationAction,
	listConversationsAction,
} from "../actions/conversations";

export const conversationsListView = defineView(
	"list",
	{
		title: "History",
		fields: { id: textField({ filterable: true }), title: textField() },
		onItemClick: { viewId: "historyChatView" },
		showInNavigation: true,
	},
	listConversationsAction,
);

export const conversationDetailedView = defineView(
	"detail",
	{
		title: "Conversation",
		fields: { id: textField() },
		tabs: [
			{
				label: "Messages",
				viewId: "messagesListView",
				setContext: async ({ searchParams }) => {
					"use server";

					return {
						initialFilter: [
							{
								field: "conversationId",
								operator: "Is",
								value: searchParams?.id,
							},
						],
					};
				},
			},
		],
	},
	getOneConversationAction,
);

export const messagesListView = defineView(
	"list",
	{
		title: "Messages",
		fields: {
			id: textField(),
			conversationId: relationshipField({
				displayField: "conversation",
				titleKey: "id",
			}),
			role: textField(),
			content: textField(),
		},
		showInNavigation: true,
	},
	getMessagesAction,
);
