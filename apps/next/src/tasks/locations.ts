import { createTask } from "melony/next";
import { getLocationAction, updateLocationAction } from "@/actions/locations";

export const getLocationTask = createTask(
	{
		slug: "getLocation",
		title: "Get Location",
		parameters: [{ name: "id", type: "number" }],
	},
	async (input) => {
		"use server";

		const { params = {} } = input || {};

		const res = await getLocationAction(params.id);

		return { type: "infoList", list: res };
	},
);

export const updateLocationTask = createTask(
	{
		slug: "editLocation",
		title: "Edit Location",
		parameters: [
			{ name: "id", type: "number" },
			{ name: "city" },
			{ name: "country" },
		],
	},
	async (input) => {
		"use server";

		const { params = {} } = input || {};

		const res = await updateLocationAction(params.id, params);

		return { type: "infoList", list: res };
	},
);

export const getAndUpdateLocationTask = createTask(
	{
		slug: "getAndUpdateLocation",
		parameters: [{ name: "id", type: "number" }],
	},
	async (input) => {
		"use server";

		const { params = {} } = input || {};

		const res = await getLocationAction(params.id);

		if (!res) {
			throw new Error("Location not found");
		}

		return {
			type: "task",
			task: createTask(
				{
					slug: "editLocation",
					title: "Edit Location",
					parameters: [
						{ name: "id", type: "number", default: res.id },
						{ name: "city", default: res.city },
						{ name: "country", default: res.country },
					],
				},
				async (input) => {
					"use server";

					const { params = {} } = input || {};

					const res = await updateLocationAction(params.id, params);

					return { type: "infoList", list: res };
				},
			),
		};
	},
);
