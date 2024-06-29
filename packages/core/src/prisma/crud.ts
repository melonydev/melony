import {
	CreateActionPayload,
	DeleteActionPayload,
	ListActionPayload,
	Resource,
	UpdateActionPayload,
} from "@melony/types";
import { prisma } from "./prisma";
import { buildInclude, buildWhere } from "./helpers";

export const listAction = async ({ resource, filter }: ListActionPayload) => {
	"use server";

	const where = buildWhere(filter || []);
	const include = buildInclude(resource);

	// TODO: { select } needed for optimization to take only needed fields from related doc

	// @ts-ignore
	const res = await prisma[resource.model].findMany({
		where,
		include,
	}); // TODO: here modelName is camelCase so im not sure how it works when prisma.user model is always lowerCase.
	return res;
};

export const getAction = async ({
	resource,
	where,
}: {
	resource: Resource;
	where: any;
}) => {
	"use server";

	const include = buildInclude(resource);

	// @ts-ignore
	const res = await prisma[resource.model].findFirst({ where, include });
	return res;
};

export const createAction = async ({
	resource,
	data: inputData,
}: CreateActionPayload) => {
	"use server";

	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[resource.model].create({
		data,
	});

	return res;
};

export const updateAction = async ({
	resource,
	data: inputData,
}: UpdateActionPayload) => {
	"use server";

	const data = { ...inputData };
	delete data.id;

	// @ts-ignore
	const res = await prisma[resource.model].update({
		where: {
			id: inputData?.id,
		},
		data,
	});

	return res;
};

export const deleteAction = async ({
	resource,
	where,
}: DeleteActionPayload) => {
	"use server";

	// @ts-ignore
	const res = await prisma[resource.model].delete({
		where,
	});

	return res;
};
