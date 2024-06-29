"use server";

import { LoginActionPayload, User } from "@melony/types";
import {
	comparePasswords,
	createSession,
	deleteSession,
	getAction,
	verifySession,
} from "..";

const USERS_COLLECTION = "user"; // TODO: User collection is hardcoded for now

export async function loginAction(
	payload: LoginActionPayload,
): Promise<User | null> {
	"use server"; // TODO: i dont understand why the module directive at the top of the file not working

	try {
		const user = await getAction({
			resource: { model: USERS_COLLECTION, fields: [] },
			where: { email: payload.email },
		});

		if (user) {
			const isValid = await comparePasswords(
				payload.password,
				user?.password || "",
			);

			if (isValid) {
				await createSession(user.id);

				return user;
			} else {
				return null;
			}
		} else {
			return null;
		}
	} catch (err) {
		return null;
	}
}

export async function logoutAction() {
	"use server";

	deleteSession();
}

export const getUserAction = async () => {
	"use server";

	const session = await verifySession();
	if (!session) return null;

	try {
		const user = await getAction({
			resource: { model: USERS_COLLECTION, fields: [] },
			where: { id: session.userId },
		});

		return user;
	} catch (error) {
		console.log("Failed to fetch user");
		return null;
	}
};
