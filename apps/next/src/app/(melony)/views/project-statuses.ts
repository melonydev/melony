import { DetailView, Field, View } from "melony";
import {
	getOneProjectStatusAction,
	listProjectStatusesAction,
} from "../actions/project-status";

const fields: Record<string, Field> = {
	title: {},
	color: { type: "color" },
	projects: {
		type: "relationship",
		isList: true,
	},
};

export const projectStatusesListView: View = {
	type: "list",
	title: "Project Statuses",
	fields,
	action: listProjectStatusesAction,
	showInNavigation: true,
	onItemClick: { viewId: "projectStatusDetailedView" },
};

export const projectStatusDetailedView: DetailView = {
	type: "detail",
	title: "Project Status",
	fields,
	action: getOneProjectStatusAction,
	tabs: [
		{
			label: "Projects",
			viewId: "projectsMiniListView",
			setContext: async ({ searchParams }) => {
				"use server";

				return {
					initialFilter: [
						{
							field: "statusId",
							operator: "Is",
							value: searchParams?.id,
						},
					],
				};
			},
		},
	],
};
