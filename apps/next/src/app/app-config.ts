import { AppConfig } from "melony";
import { projectStatusResource } from "./(melony)/resources/project-status";
import { taskResource } from "./(melony)/resources/task";
import { userResource } from "./(melony)/resources/users";
import { authResource } from "./(melony)/resources/auth";

import { loginAction, logoutAction, meAction } from "./(melony)/actions/auth";
import * as projectViews from "./(melony)/views/projects";
import * as projectStatusesViews from "./(melony)/views/project-statuses";
import * as customersViews from "./(melony)/views/customers";

export const appConfig: AppConfig = {
	title: "SimpleCRM",
	auth: { meAction, logoutAction, loginAction },
	views: {
		auth: authResource,
		projectStatusResource,
		taskResource,
		userResource,
		...projectViews,
		...projectStatusesViews,
		...customersViews,
	},
};
