"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getGithubAccessTokenAction } from "./auth";

export async function getGithubReposAction() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		return [];
	}

	try {
		const githubAccessToken = await getGithubAccessTokenAction();

		const response = await fetch("https://api.github.com/user/repos", {
			headers: {
				Authorization: `Bearer ${githubAccessToken}`,
				Accept: "application/vnd.github.v3+json",
			},
		});

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.statusText}`);
		}

		const repos = await response.json();
		return repos;
	} catch (error) {
		console.error("Error fetching GitHub repos:", error);
		throw error;
	}
}
