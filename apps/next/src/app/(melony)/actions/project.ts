"use server";

import { prisma } from "@/lib/prisma";
import {
	CreateActionParams,
	CustomActionParams,
	DeleteOneActionParams,
	GetOneActionParams,
	UpdateActionParams,
} from "melony/config";

export const getProjectsList = async () => {
	const res = await prisma.project.findMany({
		include: { customer: true, owner: true, status: true },
	});

	return { rows: res };
};

export const getOneProject = async ({ id }: GetOneActionParams) => {
	return await prisma.project.findUnique({
		where: { id: Number(id) },
		include: { customer: true, owner: true, status: true },
	});
};

export const createProject = async ({ data }: CreateActionParams) => {
	return await prisma.project.create({
		data,
	});
};

export const updateProject = async ({ id, data }: UpdateActionParams) => {
	return await prisma.project.update({
		where: { id: Number(id) },
		data,
	});
};

export const deleteProject = async ({ id }: DeleteOneActionParams) => {
	return await prisma.project.delete({
		where: { id: Number(id) },
	});
};

export const sendProjectEmail = async ({ id, data }: CustomActionParams) => {
	console.log("id", id);
	console.log("data", data);
};
