"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DocAction, DocActionParams, ListAction } from "melony/config";

export const getTasksList: ListAction["execute"] = async () => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [] };
	}

	const res = await prisma.task.findMany();

	return { items: res };
};

export const getOneTask: DocAction["execute"] = async ({
	id,
}: DocActionParams) => {
	return (
		(await prisma.task.findUnique({
			where: { id: Number(id) },
		})) || {}
	);
};
