"use server";

import { prisma } from "@/lib/prisma";
import { DocAction, FormAction, ListAction } from "melony";

export const getProjectStatusSuggestions = async () => {
	const res = await prisma.projectStatus.findMany();

	return res.map((item) => ({
		label: item.title,
		value: `${item.id}`,
		color: `${item.color}`,
	}));
};

export const listProjectStatusesAction: ListAction["execute"] = async () => {
	const res = await prisma.projectStatus.findMany({
		include: { projects: { take: 3 } },
	});

	return { items: res, meta: {} };
};

export const getOneProjectStatusAction: DocAction["execute"] = async ({
	id,
}) => {
	const doc = await prisma.projectStatus.findUnique({
		where: { id: Number(id) },
	});

	return doc || {};
};

export const updateProjectStatusAction: FormAction["execute"] = async ({
	id,
	data,
}) => {
	await prisma.projectStatus.update({
		where: { id: Number(id) },
		data,
	});

	return { type: "notify", message: "Success" };
};
