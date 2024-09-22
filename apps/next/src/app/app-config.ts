import { AppConfig } from "melony";
import { projectStatusResource } from "./(melony)/resources/project-status";
import { taskResource } from "./(melony)/resources/task";
import { userResource } from "./(melony)/resources/users";
import { authResource } from "./(melony)/resources/auth";
import * as projectViews from "./(melony)/views/projects";
import * as projectStatusesViews from "./(melony)/views/project-statuses";

export const appConfig: AppConfig = {
	title: "Saamkroshii",
	views: {
		auth: authResource,
		projectStatusResource,
		taskResource,
		userResource,
		...projectViews,
		...projectStatusesViews,
	},
};
