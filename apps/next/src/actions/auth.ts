"use server";

import { prisma } from "@/lib/prisma";
import { getUserBySessionUseCase, singInUseCase } from "@/use-cases/users";
import { signInPayloadSchema } from "@/validation-schemas/users";
import { verifySession } from "melony/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerAction } from "zsa";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TaskActionOutput } from "melony/config";

export async function singInAction() {
	// inputData: z.infer<typeof signInPayloadSchema>,
	// await singInUseCase(inputData);

	redirect("/api/auth/login");
}

export async function signOutAction() {
	// inputData: z.infer<typeof signInPayloadSchema>,
	// await singInUseCase(inputData);

	redirect("/api/auth/logout");
}

// export const singInAction = createServerAction()
// 	.input(
// 		z.object({
// 			email: z.string().email().min(1, "Email cannot be blank"),
// 			password: z.string().min(1, "Password cannot be blank"),
// 		}),
// 	)
// 	.handler(async ({ input }) => {
// 		const user = await prisma.user.findUnique({
// 			where: { email: input.email },
// 		});

// 		return user;
// 	});

export const getUserAction = async (): Promise<TaskActionOutput> => {
	// return await getUserBySessionUseCase();

	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return { type: "infoList", list: user };
};

export const verifyUserAction = async () => {
	// return await getUserBySessionUseCase();

	const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		throw new Error("Please login");
	}
};
