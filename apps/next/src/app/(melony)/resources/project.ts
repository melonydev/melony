import { Resource } from "melony/config";
import {
	createProject,
	deleteProject,
	getOneProject,
	getProjectsList,
	sendProjectEmail,
	updateProject,
} from "../actions/project";
import { getCustomerSuggestions } from "../actions/customer";
import { getUserSuggestions } from "../actions/user";
import { getProjectStatusSuggestions } from "../actions/project-status";

export const projectResource: Resource = {
	id: "projects",
	title: "Projects",
	fields: [
		{ key: "title", label: "Title" },
		{
			key: "amount",
			label: "Amount",
			description: "Grand amount of the current project.",
			type: "number",
		},
		{
			key: "customerId",
			label: "Customer",
			type: "relationship",
			handler: getCustomerSuggestions,
			valueAsNumber: true,
			displayField: "customer",
		},
		{
			key: "ownerId",
			label: "Owner",
			type: "relationship",
			handler: getUserSuggestions,
			valueAsNumber: true,
			displayField: "owner",
		},
		{
			key: "statusId",
			label: "Status",
			type: "relationship",
			handler: getProjectStatusSuggestions,
			valueAsNumber: true,
			displayField: "status",
		},
	],
	actions: [
		{
			id: "list",
			title: "List Projects",
			type: "getList",
			handler: getProjectsList,
		},
		{
			id: "show",
			type: "getOne",
			handler: getOneProject,
		},
		{
			id: "create",
			type: "create",
			handler: createProject,
		},
		{
			id: "edit",
			type: "update",
			handler: updateProject,
		},
		{
			id: "delete",
			type: "deleteOne",
			title: "Delete",
			handler: deleteProject,
		},
		{
			id: "send-email",
			type: "custom",
			title: "Send Email",
			handler: sendProjectEmail,
			fields: [{ key: "subject", label: "Email Subject" }],
		},
	],
};
