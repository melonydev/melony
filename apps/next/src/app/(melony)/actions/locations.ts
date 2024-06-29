"use server";

import { createServerAction } from "zsa";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { ExampleClientComponent } from "./example-component";

export const listLocationsQueryAction = async () => {
	const res = prisma.location.findMany();
	return res;
};

export const locationsPage = createServerAction().handler(async () => {
	return {
		grid: {
			columns: [
				{
					action: listLocations,
				},
			],
		},
	};
});

export const listLocations = createServerAction().handler(async () => {
	const data = await prisma.location.findMany();

	return data;
});

export const crateLocation = createServerAction()
	.input(
		z.object({
			data: z.any(),
		}),
	)
	.onSuccess(async () => {})
	.handler(async ({ input: { data } }) => {
		const res = await prisma.location.create({ data });

		return { res };
	});

export const updateLocation = createServerAction()
	.input(
		z.object({
			id: z.number(),
			data: z.any(),
		}),
	)
	.onSuccess(async () => {
		await listLocations();
	})
	.handler(async ({ input: { id, data } }) => {
		const res = await prisma.location.update({ where: { id }, data });

		return {
			display: ExampleClientComponent,
			data: res,
		};
	});
