import { AppConfig } from "melony";

import { loginAction, logoutAction, meAction } from "./(melony)/actions/auth";
import * as projectViews from "./(melony)/views/projects";
import * as projectStatusesViews from "./(melony)/views/project-statuses";
import * as customersViews from "./(melony)/views/customers";
import * as tasksViews from "./(melony)/views/tasks";
import * as chatViews from "./(melony)/views/chat";
import * as conversationViews from "./(melony)/views/conversations";
import * as githubViews from "./(melony)/views/github";

export const appConfig: AppConfig = {
	title: "SimpleCRM",
	auth: { meAction, logoutAction, loginAction },
	views: {
		...projectViews,
		...projectStatusesViews,
		...customersViews,
		...tasksViews,
		...chatViews,
		...conversationViews,
		...githubViews,
	},
};
