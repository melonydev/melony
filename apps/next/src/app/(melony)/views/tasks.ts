import { Field, ListView } from "melony";
import { getTasksList } from "../actions/task";
import { getProjectsSuggestions } from "../actions/project";

const fields: Record<string, Field> = {
	title: { label: "Title" },
	projectId: {
		label: "Project",
		type: "relationship",
		getSuggestions: getProjectsSuggestions,
		valueAsNumber: true,
		displayField: "project",
	},
	itemId: {
		label: "Item",
		type: "relationship",
		valueAsNumber: true,
		displayField: "item",
	},
	price: {
		label: "Price",
		type: "number",
	},
	ownerId: {
		label: "Owner",
		type: "relationship",
		valueAsNumber: true,
		displayField: "owner",
	},
	statusId: {
		label: "Status",
		type: "relationship",
		valueAsNumber: true,
		displayField: "status",
	},
};

export const tasksListView: ListView = {
	type: "list",
	title: "Tasks",
	fields: fields,
	action: getTasksList,
	headerButtons: [{ label: "Create Task", viewId: "taskCreateView" }],
	showInNavigation: true,
};
