import { formView, listView } from "melony";
import { getGithubReposAction } from "../actions/github";
import { getAuthUrlAction } from "../actions/auth";

export const githubReposListView = listView({
	title: "Your Github Repositories",
	action: getGithubReposAction,
	showInNavigation: true,
});

export const githubAuthFormView = formView({
	action: getAuthUrlAction,
	showInNavigation: true,
});
