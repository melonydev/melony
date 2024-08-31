"use server";

import { prisma } from "@/lib/prisma";

export const getUsersList = async () => {
	const res = await prisma.user.findMany();

	return { rows: res };
};

export const getUserSuggestions = async () => {
	const res = await prisma.user.findMany();

	return res.map((item) => ({
		label: item.email || `${item.id}`,
		value: `${item.id}`,
		image: `${item.image}`,
	}));
};
