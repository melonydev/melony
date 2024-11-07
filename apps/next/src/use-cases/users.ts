"use server";

import { getUserByEmail, getUserById } from "@/data-access/users";
import { comparePasswords, createSession, verifySession } from "melony/auth";
import { User } from "melony/config";

export async function singInUseCase({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const user = await getUserByEmail(email);
	if (!user) throw new Error("User not found");

	const isValid = await comparePasswords(password, user?.password || "");
	if (!isValid) throw new Error("Invalid credentials");

	await createSession(`${user.id}`);

	return user;
}

export const getUserBySessionUseCase = async (): Promise<User | null> => {
	const session = await verifySession();

	if (!session) throw new Error("No session found");

	const user = await getUserById(Number(session.userId));

	if (!user) throw new Error("No user found");

	return { id: `${user.id}`, email: user.email };
};
