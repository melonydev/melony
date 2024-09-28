"use server";

import {
	convertToPrismaOrderBy,
	filterToPrismaQuery,
	prisma,
} from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DetailView, DetailViewParams, ListView } from "melony";

export const getTasksList: ListView["action"] = async ({
	filter,
	paginate,
	sort,
}) => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [] };
	}

	const where = filterToPrismaQuery(filter || []);
	const take = paginate?.pageSize || 10;
	const skip = take * (paginate?.pageIndex || 0);
	const orderBy = convertToPrismaOrderBy(sort || []);

	const res = await prisma.task.findMany({
		include: { project: true, item: true, status: true, owner: true },
		where,
		skip,
		orderBy,
	});

	return { items: res };
};

export const getOneTask: DetailView["action"] = async ({
	id,
}: DetailViewParams) => {
	return (
		(await prisma.task.findUnique({
			where: { id: Number(id) },
		})) || {}
	);
};
