import { Config } from "melony/config";
import { prisma } from "melony/prisma";

const config: Config = {
	resources: [
		{
			label: "Projects",
			model: "Project",
			fields: [
				{ name: "title" },
				{ name: "customer" },
				{ name: "amount" },
				{
					name: "status",
				},
				{ name: "owner" },
				{ name: "tasks" },
			],
			// actions: [
			// 	{
			// 		name: "Calculate total amount",
			// 		handle: async ({ docs }) => {
			// 			"use server";

			// 			await Promise.all(
			// 				docs.map(async (doc: any) => {
			// 					const tasks = await prisma.task.findMany({
			// 						where: {
			// 							projectId: doc.id,
			// 						},
			// 					});

			// 					const amount = tasks.reduce((prev, curr) => {
			// 						return prev + curr.price;
			// 					}, 0);

			// 					await prisma.project.update({
			// 						where: {
			// 							id: doc.id,
			// 						},
			// 						data: {
			// 							amount,
			// 						},
			// 					});
			// 				}),
			// 			);
			// 		},
			// 	},
			// ],
		},
		{
			label: "Tasks",
			model: "Task",
			fields: [
				{ name: "title" },
				{ name: "item" },
				{ name: "description", type: "rich" },
				{ name: "price" },
				{ name: "project" },
				{ name: "status" },
				{ name: "owner" },
			],
		},
		{
			label: "Task Statuses",
			model: "TaskStatus",
			fields: [{ name: "title" }, { name: "color", type: "color" }],
		},
		{
			label: "Customers",
			model: "Customer",
			fields: [{ name: "title" }],
		},
		{
			label: "Items",
			model: "Item",
			fields: [
				{ name: "title" },
				{ name: "sku" },
				{ name: "price" },
				{
					name: "type",
					type: "select",
					options: [
						{ label: "PRODUCT", value: "PRODUCT" },
						{ label: "MATERIAL", value: "MATERIAL" },
					],
				},
			],
		},
		{
			label: "Users",
			model: "User",
			fields: [
				{ name: "image", type: "image" },
				{ name: "name" },
				{ name: "email" },
				{ name: "password" },
			],
		},
	],
};

export default config;
