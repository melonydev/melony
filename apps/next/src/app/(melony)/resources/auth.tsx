import { Resource } from "melony";

import {
	isLoggedInAction,
	isLoggedOut,
	loginAction,
	logoutAction,
	meAction,
} from "../actions/auth";

export const authResource: Resource = {
	title: "Auth",
	hasAccess: isLoggedOut,
	actions: {
		login: {
			type: "form",
			title: "Login",
			execute: loginAction,
		},

		logout: {
			type: "form",
			hasAccess: isLoggedInAction,
			execute: logoutAction,
		},
		me: {
			type: "doc",
			hasAccess: isLoggedInAction,
			execute: meAction,
		},
	},
};
