import { createTask } from "melony/next";
import { getLocationAction } from "@/actions/locations";

export const getLocationTask = createTask(
	{
		slug: "getAndUpdateLocation",
		title: "Get and Update Location",
		parameters: [{ name: "id", type: "number" }],
	},
	async (input) => {
		const { params = {} } = input || {};

		const res = await getLocationAction(params.id);

		return { type: "infoList", list: res };
	},
);
