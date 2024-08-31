import { Resource } from "melony/config";
import { loginAction, logoutAction } from "../actions/auth";
import { getUserAction } from "@/actions/auth";

export const authResource: Resource = {
	id: "auth",
	title: "Auth",
	actions: [
		{
			id: "login",
			type: "custom",
			handler: loginAction,
		},
		{
			id: "logout",
			type: "custom",
			handler: logoutAction,
		},
		{
			id: "get-user",
			type: "custom",
			handler: getUserAction,
		},
	],
};
