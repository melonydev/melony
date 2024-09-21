import { AppConfig } from "melony";
import { projectResource } from "./(melony)/resources/project";
import { projectStatusResource } from "./(melony)/resources/project-status";
import { taskResource } from "./(melony)/resources/task";
import { userResource } from "./(melony)/resources/users";
import { authResource } from "./(melony)/resources/auth";

export const appConfig: AppConfig = {
	title: "Saamkroshii",
	resources: {
		auth: authResource,
		projects: projectResource,
		projectStatusResource,
		taskResource,
		userResource,
	},
};
