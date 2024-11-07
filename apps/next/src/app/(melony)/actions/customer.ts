"use server";

import { filterToPrismaQuery, prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListView } from "melony";

export const getCustomerSuggestions = async () => {
	const res = await prisma.customer.findMany();

	return res.map((item) => ({ label: item.title, value: `${item.id}` }));
};

export const getCustomersAction: ListView["action"] = async ({ filter }) => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [], meta: {} };
	}

	const where = filterToPrismaQuery(filter || []);

	const res = await prisma.customer.findMany({
		where,
	});

	return { items: res, meta: {} };
};
