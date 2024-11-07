import { defineView, Field } from "melony";
import { getCustomersAction } from "../actions/customer";

const fields: Record<string, Field> = {
	id: { label: "ID" },
	title: { label: "Title" },
};

export const customersListView = defineView(
	"list",
	{
		title: "Customers",
		fields: fields,
		headerButtons: [{ label: "Create Customer", viewId: "customerCreateView" }],
		itemButtons: [{ label: "Edit", viewId: "customerEditView" }],
		onItemClick: { viewId: "customerDetailedView" },
		showInNavigation: true,
	},
	getCustomersAction,
);
