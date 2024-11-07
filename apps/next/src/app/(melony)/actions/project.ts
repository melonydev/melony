"use server";

import {
	convertToPrismaOrderBy,
	filterToPrismaQuery,
	prisma,
} from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DetailViewAction, FormViewAction, ListViewAction } from "melony";

export const listProjectsAction: ListViewAction = async ({
	searchParams: { filter, paginate, sort },
}) => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [], meta: { total: 0 } };
	}

	const where = filterToPrismaQuery(filter || []);
	const take = paginate?.pageSize || 10;
	const skip = take * (paginate?.pageIndex || 0);
	const orderBy = convertToPrismaOrderBy(sort || []);

	const res = await prisma.project.findMany({
		include: { customer: true, owner: true, status: true },
		where,
		take,
		skip,
		orderBy,
	});

	return {
		items: res,
		meta: {
			total: await prisma.project.count({
				where,
			}),
		},
	};
};

export const getOneProjectAction: DetailViewAction = async ({
	searchParams,
}) => {
	const doc = await prisma.project.findUnique({
		where: { id: Number(searchParams?.id) },
		include: { customer: true, owner: true, status: true },
	});

	return doc || {};
};

export const createProjectAction: FormViewAction = async ({ data }) => {
	await prisma.project.create({
		data,
	});

	return { type: "notify", message: "Success" };
};

export const updateProjectAction: FormViewAction = async ({ id, data }) => {
	await prisma.project.update({
		where: { id: Number(id) },
		data,
	});

	return { type: "notify", message: "Success" };
};

export const deleteProjectAction: FormViewAction = async ({ id }) => {
	await prisma.project.delete({
		where: { id: Number(id) },
	});

	return { type: "notify", message: "Success" };
};

export const sendProjectEmailAction: FormViewAction = async ({ id, data }) => {
	"use server";
	console.log("id", id);
	console.log("data", data);

	return { type: "notify", message: "Success" };
};

export const getProjectsSuggestions = async () => {
	const res = await prisma.project.findMany();

	return res.map((item) => ({
		label: item.title,
		value: `${item.id}`,
	}));
};
