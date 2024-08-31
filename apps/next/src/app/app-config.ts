import { AppConfig } from "melony/config";
import { projectResource } from "./(melony)/resources/project";
import { projectStatusResource } from "./(melony)/resources/project-status";
import { taskResource } from "./(melony)/resources/task";
import { userResource } from "./(melony)/resources/users";
import { loginAction, logoutAction } from "./(melony)/actions/auth";
import { getUserAction } from "@/actions/auth";
import { authResource } from "./(melony)/resources/auth";

export const appConfig: AppConfig = {
	title: "Saamkroshi",
	auth: {
		actions: [
			{
				id: "login",
				type: "login",
				handler: loginAction,
			},
			{
				id: "logout",
				type: "logout",
				handler: logoutAction,
			},
			{
				id: "get-user",
				type: "getUser",
				handler: getUserAction,
			},
		],
	},
	resources: [
		authResource,
		projectResource,
		projectStatusResource,
		taskResource,
		userResource,
	],
};
