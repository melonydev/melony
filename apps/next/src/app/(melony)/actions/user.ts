"use server";

import { prisma } from "@/lib/prisma";
import { ListAction } from "melony/config";

export const getUsersList: ListAction["execute"] = async () => {
	const res = await prisma.user.findMany();

	return { items: res };
};

export const getUserSuggestions = async () => {
	const res = await prisma.user.findMany();

	return res.map((item) => ({
		label: item.email || `${item.id}`,
		value: `${item.id}`,
		image: `${item.image}`,
	}));
};
