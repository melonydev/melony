"use server";

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: string; expiresAt: Date }) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

export async function decrypt(sessionToken: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(sessionToken, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.log("Failed to verify session");
	}
}

export async function hashPassword(pass: string) {
	const hashedPassword = await bcrypt.hash(pass, 10);
	return hashedPassword;
}

export async function comparePasswords(pass: string, storedPass: string) {
	const valid = await bcrypt.compare(pass, storedPass);
	return valid;
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });

	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function updateSession() {
	const sessionToken = cookies().get("session")?.value;
	const payload = await decrypt(sessionToken);

	if (!sessionToken || !payload) {
		return null;
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	cookies().set("session", sessionToken, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: "lax",
		path: "/",
	});
}

export const verifySession = async () => {
	const sessionToken = cookies().get("session")?.value;
	const session = await decrypt(sessionToken);

	if (!session?.userId) {
		// throw new Error("Not logged in");
		return null;
	}

	// await updateSession(sessionToken, session);

	return { isAuth: true, userId: session.userId };
};

export function deleteSession() {
	cookies().delete("session");
}
