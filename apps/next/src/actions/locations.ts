"use server";

import { prisma } from "@/lib/prisma";
import { verifyUserAction } from "./auth";
import { TaskActionInput, TaskActionOutput } from "melony/config";
import { createTask } from "melony/next";

export const getLocations = async (
	input?: TaskActionInput,
): Promise<TaskActionOutput> => {
	await verifyUserAction();

	const res = await prisma.location.findMany();

	return {
		type: "table",
		fields: [
			{ name: "id" },
			{ name: "city" },
			{ name: "country" },
			{ name: "region" },
			{ name: "address" },
		],
		rows: res,
	};
};

export const getLocationsAction = async (params: {
	filter: Record<string, unknown>;
	sort: { field: string; dir: "asc" | "desc" };
	limit: number;
	skip: number;
}) => {
	const res = await prisma.location.findMany();

	return { type: "table", data: res };
};

export const createLocation = async (
	input?: TaskActionInput,
): Promise<TaskActionOutput> => {
	const { params = {} } = input || {};

	const res = params || {};

	return { type: "infoList", list: res };
};

export const updateLocation = async (
	input?: TaskActionInput,
): Promise<TaskActionOutput> => {
	const { params = {} } = input || {};

	const res = await prisma.location.update({
		where: { id: params?.id },
		data: { ...params },
	});

	return { type: "infoList", list: res };
};
 

export const getLocationAction = async (id: number) => {
	const res = await prisma.location.findFirst({ where: { id } });

	if (!res) {
		throw new Error("Location not found");
	}

	return res;
};

export const updateLocationAction = async (id: number, data: any) => {
	const res = await prisma.location.update({
		where: { id },
		data,
	});

	return res;
};
