"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HasAccess, User } from "melony";
import { redirect } from "next/navigation";

const { getUser } = getKindeServerSession();

export const loginAction = async () => {
	redirect("/api/auth/login");
};

export const logoutAction = async () => {
	redirect("/api/auth/logout");
};

export const meAction = async (): Promise<User | null> => {
	const kindeUser = await getUser();

	if (!kindeUser) throw new Error("User not found");

	return {
		id: kindeUser.id,
		email: kindeUser.email,
		picture: kindeUser.picture || undefined,
		displayName: `${kindeUser.given_name} ${kindeUser.family_name}`,
	};
};

export const isLoggedInAction: HasAccess = async ({ user }) => {
	return Boolean(user);
};

export const isLoggedOut: HasAccess = async ({ user }) => {
	return !Boolean(user);
};

export const getAuthUrlAction = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const token = await getManagementApiAccessTokenAction();

	const authUrlRes = await fetch(
		`https://melony.kinde.com/api/v1/connected_apps/auth_url?key_code_ref=melony&user_id=${user?.id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		},
	).then((res) => res.json());

	console.log("authUrlRes", authUrlRes);

	return authUrlRes;
};

export const getGithubAccessTokenAction = async () => {
	try {
		const token = await getManagementApiAccessTokenAction();

		const sessionIdRes = await getAuthUrlAction();

		// Get the GitHub token from Kinde's connected identities
		const connectedAppsRes = await fetch(
			`https://melony.kinde.com/api/v1/connected_apps/token?session_id=${sessionIdRes?.session_id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			},
		).then((res) => res.json());

		console.log("connectedAppsRes", connectedAppsRes);

		// Find GitHub token from connected apps
		const githubConnection = connectedAppsRes.connected_apps?.find(
			(app: any) => app.name === "github",
		);

		if (!githubConnection?.access_token) {
			throw new Error(
				"GitHub account not connected. Please connect your GitHub account in Kinde.",
			);
		}

		return githubConnection.access_token;
	} catch (err) {}
};

export const getManagementApiAccessTokenAction = async () => {
	try {
		const searchParams = {
			grant_type: "client_credentials",
			client_id: process.env.KINDE_M2M_CLIENT_ID || "",
			client_secret: process.env.KINDE_M2M_CLIENT_SECRET || "",
			audience: "https://melony.kinde.com/api",
		};

		const res = await fetch("https://melony.kinde.com/oauth2/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams(searchParams),
		});
		const token = await res.json();

		return token?.access_token;
	} catch (err) {
		throw err;
	}
};
