import { Field, Resource } from "melony";
import {
	getOneProjectStatusAction,
	listProjectStatusesAction,
	updateProjectStatusAction,
} from "../actions/project-status";

const fields: Record<string, Field> = {
	title: {},
	color: { type: "color" },
	projects: {
		type: "relationship",
		isList: true,
	},
};

export const projectStatusResource: Resource = {
	title: "Project Statuses",
	actions: {
		list: {
			type: "list",
			title: "List",
			fields,
			execute: listProjectStatusesAction,
		},
		read: {
			type: "doc",
			fields,
			execute: getOneProjectStatusAction,
		},
		update: {
			type: "form",
			title: "Edit",
			fields,
			isDocRequired: true,
			execute: updateProjectStatusAction,
		},
	},
};
