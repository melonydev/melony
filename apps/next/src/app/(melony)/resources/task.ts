import { Resource } from "melony/config";
import { getOneTask, getTasksList } from "../actions/task";

export const taskResource: Resource = {
	id: "task",
	title: "Tasks",
	fields: [
		{ key: "title", label: "Title" },
		{ key: "price", label: "Price" },
		{ key: "description", label: "Description", type: "rich" },
	],
	actions: [
		{
			id: "list",
			type: "list",
			execute: getTasksList,
		},
		{
			id: "show",
			type: "doc",
			execute: getOneTask,
		},
	],
};
