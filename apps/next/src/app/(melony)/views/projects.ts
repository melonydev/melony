import { Field, View } from "melony";
import {
	createProjectAction,
	getOneProjectAction,
	listProjectsAction,
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
		filterable: true,
		sortable: true,
	},
};

export const projectsListView: View = {
	type: "list",
	title: "Projects",
	fields: fields,
	action: listProjectsAction,
	headerButtons: [{ label: "Create Project", viewId: "projectCreateView" }],
	itemButtons: [{ label: "Edit", viewId: "projectEditView" }],
	onItemClick: { viewId: "projectDetailedView" },
	showInNavigation: true,
};

export const projectsMiniListView: View = {
	type: "list",
	title: "Projects",
	fields: {
		title: { label: "Title", filterable: true },
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
			filterable: true,
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
	},
	action: listProjectsAction,
	itemButtons: [{ label: "Edit", viewId: "projectEditView" }],
	onItemClick: { viewId: "projectDetailedView" },
};

export const projectCreateView: View = {
	type: "form",
	title: "Create Project",
	fields: fields,
	action: createProjectAction,
};

export const projectEditView: View = {
	type: "form",
	title: "Edit Project",
	fields: fields,
	isDocRequired: true,
	getDefaultValues: getOneProjectAction,
	action: updateProjectAction,
};

export const projectDetailedView: View = {
	type: "detail",
	fields: fields,
	action: getOneProjectAction,
	headerButtons: [{ label: "Edit", viewId: "projectEditView" }],
};
