"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetOneActionParams } from "melony/config";

export const getTasksList = async () => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { rows: [] };
	}

	const res = await prisma.task.findMany();

	return { rows: res };
};

export const getOneTask = async ({ id }: GetOneActionParams) => {
	return await prisma.task.findUnique({
		where: { id: Number(id) },
	});
};
