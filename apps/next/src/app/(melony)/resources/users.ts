import { Resource } from "melony/config";
import { getUsersList } from "../actions/user";

export const userResource: Resource = {
	id: "users",
	title: "Users",
	fields: [{ key: "image", type: "image" }, { key: "name" }, { key: "email" }],
	actions: [
		{
			id: "all",
			type: "list",
			execute: getUsersList,
		},
	],
};
