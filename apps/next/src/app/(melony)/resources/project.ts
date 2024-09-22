import { Field, Resource } from "melony";
import {
	createProjectAction,
	deleteProjectAction,
	getOneProjectAction,
	listProjectsAction,
	sendProjectEmailAction,
	updateProjectAction,
} from "../actions/project";
import { getCustomerSuggestions } from "../actions/customer";
import { getUserSuggestions } from "../actions/user";
import { getProjectStatusSuggestions } from "../actions/project-status";

const fields: Record<string, Field> = {
	title: { label: "Title" },
	amount: {
		label: "Amount",
		description: "Grand amount of the current project.",
		type: "number",
		hasAccess: async ({ user }) => {
			"use server";
			return user?.email === "d.daraselia@gmail.com";
		},
	},
	customerId: {
		label: "Customer",
		type: "relationship",
		getSuggestions: getCustomerSuggestions,
		valueAsNumber: true,
		displayField: "customer",
	},
	ownerId: {
		label: "Owner",
		type: "relationship",
		getSuggestions: getUserSuggestions,
		valueAsNumber: true,
		displayField: "owner",
	},
	statusId: {
		label: "Status",
		type: "relationship",
		getSuggestions: getProjectStatusSuggestions,
		valueAsNumber: true,
		displayField: "status",
	},
};

export const projectResource: Resource = {
	title: "Projects",
	actions: {
		list: {
			type: "list",
			title: "List Projects",
			fields: fields,
			execute: listProjectsAction,
		},
		read: {
			type: "doc",
			fields: fields,
			execute: getOneProjectAction,
		},
		create: {
			type: "form",
			fields: fields,
			execute: createProjectAction,
		},
		update: {
			type: "form",
			title: "Edit",
			fields: fields,
			isDocRequired: true,
			execute: updateProjectAction,
		},
		delete: {
			type: "form",
			title: "Delete",
			isDocRequired: true,
			fields: { id: { isReadOnly: true } },
			execute: deleteProjectAction,
		},
		"send-email": {
			type: "form",
			title: "Send Email",
			isDocRequired: true,
			fields: { subject: { label: "Email Subject" } },
			execute: sendProjectEmailAction,
		},
	},
};
