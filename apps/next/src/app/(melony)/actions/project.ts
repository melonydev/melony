"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DocAction, FormAction, ListAction } from "melony";

export const listProjectsAction: ListAction["execute"] = async () => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [], meta: {} };
	}

	const res = await prisma.project.findMany({
		include: { customer: true, owner: true, status: true },
	});

	return { items: res, meta: {} };
};

export const getOneProjectAction: DocAction["execute"] = async ({ id }) => {
	const doc = await prisma.project.findUnique({
		where: { id: Number(id) },
		include: { customer: true, owner: true, status: true },
	});

	return doc || {};
};

export const createProjectAction: FormAction["execute"] = async ({ data }) => {
	await prisma.project.create({
		data,
	});

	return { type: "notify", message: "Success" };
};

export const updateProjectAction: FormAction["execute"] = async ({
	id,
	data,
}) => {
	await prisma.project.update({
		where: { id: Number(id) },
		data,
	});

	return { type: "notify", message: "Success" };
};

export const deleteProjectAction: FormAction["execute"] = async ({ id }) => {
	await prisma.project.delete({
		where: { id: Number(id) },
	});

	return { type: "notify", message: "Success" };
};

export const sendProjectEmailAction: FormAction["execute"] = async ({
	id,
	data,
}) => {
	"use server";
	console.log("id", id);
	console.log("data", data);

	return { type: "notify", message: "Success" };
};
