"use server";

import { filterToPrismaQuery, prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DetailView, FormView, ListView } from "melony";

export const listProjectsAction: ListView["action"] = async ({ filter }) => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [], meta: {} };
	}

	const where = filterToPrismaQuery(filter || []);

	const res = await prisma.project.findMany({
		include: { customer: true, owner: true, status: true },
		where,
	});

	return { items: res, meta: {} };
};

export const getOneProjectAction: DetailView["action"] = async ({ id }) => {
	const doc = await prisma.project.findUnique({
		where: { id: Number(id) },
		include: { customer: true, owner: true, status: true },
	});

	return doc || {};
};

export const createProjectAction: FormView["action"] = async ({ data }) => {
	await prisma.project.create({
		data,
	});

	return { type: "notify", message: "Success" };
};

export const updateProjectAction: FormView["action"] = async ({ id, data }) => {
	await prisma.project.update({
		where: { id: Number(id) },
		data,
	});

	return { type: "notify", message: "Success" };
};

export const deleteProjectAction: FormView["action"] = async ({ id }) => {
	await prisma.project.delete({
		where: { id: Number(id) },
	});

	return { type: "notify", message: "Success" };
};

export const sendProjectEmailAction: FormView["action"] = async ({
	id,
	data,
}) => {
	"use server";
	console.log("id", id);
	console.log("data", data);

	return { type: "notify", message: "Success" };
};
