import { defineView, Field, listView } from "melony";
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
	statusId: {
		label: "Status",
		type: "relationship",
		getSuggestions: getProjectStatusSuggestions,
		valueAsNumber: true,
		displayField: "status",
		filterable: true,
		sortable: true,
	},
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
		filterable: true,
	},
};

export const projectsListView = listView({
	action: listProjectsAction,
	title: "Projects",
	fields: fields,
	headerButtons: [{ label: "Create Project", viewId: "projectCreateView" }],
	itemButtons: [{ label: "Edit", viewId: "projectEditView" }],
	onItemClick: { viewId: "projectDetailedView" },
	showInNavigation: true,
});

export const projectsMiniListView = defineView(
	"list",
	{
		title: "Projects",
		fields: {
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
		},
		itemButtons: [{ label: "Edit", viewId: "projectEditView" }],
		onItemClick: { viewId: "projectDetailedView" },
	},
	listProjectsAction,
);

export const projectCreateView = defineView(
	"form",
	{
		title: "Create Project",
		fields: fields,
	},
	createProjectAction,
);

export const projectEditView = defineView(
	"form",
	{
		title: "Edit Project",
		fields: fields,
		isDocRequired: true,
		getDefaultValues: getOneProjectAction,
	},
	updateProjectAction,
);

export const projectDetailedView = defineView(
	"detail",
	{
		title: "Project Details",
		fields: fields,
		headerButtons: [{ label: "Edit", viewId: "projectEditView" }],
		tabs: [
			{
				label: "Tasks",
				viewId: "tasksListView",
				setContext: async ({ searchParams }) => {
					"use server";

					return {
						initialFilter: [
							{
								field: "projectId",
								operator: "Is",
								value: searchParams?.id,
							},
						],
					};
				},
			},
		],
	},
	getOneProjectAction,
);
