import { defineView, Field, listView } from "melony";
import { getOneTask, getTasksList } from "../actions/task";
import { getProjectsSuggestions } from "../actions/project";

const fields: Record<string, Field> = {
	title: { label: "Title", filterable: true },
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

export const tasksListView = listView({
	title: "Tasks",
	fields: fields,
	headerButtons: [{ label: "Create Task", viewId: "taskCreateView" }],
	showInNavigation: true,
	onItemClick: { viewId: "taskDetailedView" },
	action: getTasksList,
});

export const taskDetailedView = defineView(
	"detail",
	{
		title: "Task Details",
		fields: fields,
	},
	getOneTask,
);
