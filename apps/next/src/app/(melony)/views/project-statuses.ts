import { defineView, Field } from "melony";
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

export const projectStatusesListView = defineView(
	"list",
	{
		title: "Project Statuses",
		fields,
		onItemClick: { viewId: "projectStatusDetailedView" },
	},
	listProjectStatusesAction,
);

export const projectStatusDetailedView = defineView(
	"detail",
	{
		title: "Project Status",
		fields,
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
	},
	getOneProjectStatusAction,
);
