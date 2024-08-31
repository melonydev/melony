"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "melony/config";
import { redirect } from "next/navigation";

const { getUser } = getKindeServerSession();

export const loginAction = async () => {
	redirect("/api/auth/login");
};

export const logoutAction = async () => {};

export const getUserAction = async (): Promise<User> => {
	const kindeUser = await getUser();

	if (!kindeUser) throw new Error("User not found");

	return {
		id: kindeUser.id,
		email: kindeUser.email,
		picture: kindeUser.picture || undefined,
		fullName: `${kindeUser.given_name} ${kindeUser.family_name}`,
	};
};
