import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: { email },
	});
}

export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
		where: { id },
	});
};
