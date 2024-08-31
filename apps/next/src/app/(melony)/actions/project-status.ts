"use server";

import { prisma } from "@/lib/prisma";

export const getProjectStatusSuggestions = async () => {
	const res = await prisma.projectStatus.findMany();

	return res.map((item) => ({
		label: item.title,
		value: `${item.id}`,
		color: `${item.color}`,
	}));
};
