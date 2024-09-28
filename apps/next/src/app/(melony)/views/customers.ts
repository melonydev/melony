import { Field, View } from "melony";
import { getCustomersAction } from "../actions/customer";

const fields: Record<string, Field> = {
	id: { label: "ID" },
	title: { label: "Title" },
};

export const customersListView: View = {
	type: "list",
	title: "Customers",
	fields: fields,
	action: getCustomersAction,
	headerButtons: [{ label: "Create Customer", viewId: "customerCreateView" }],
	itemButtons: [{ label: "Edit", viewId: "customerEditView" }],
	onItemClick: { viewId: "customerDetailedView" },
	showInNavigation: true,
};
