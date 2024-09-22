"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DocAction, FormAction, HasAccess } from "melony";
import { redirect } from "next/navigation";

const { getUser } = getKindeServerSession();

export const loginAction: FormAction["execute"] = async () => {
	redirect("/api/auth/login");
};

export const logoutAction: FormAction["execute"] = async () => {
	redirect("/api/auth/logout");
};

export const meAction: DocAction["execute"] = async () => {
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
