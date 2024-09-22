"use server";

import { prisma } from "@/lib/prisma";

export const getCustomerSuggestions = async () => {
	const res = await prisma.customer.findMany();

	return res.map((item) => ({ label: item.title, value: `${item.id}` }));
};
