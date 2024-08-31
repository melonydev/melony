import { createTableWidget } from "melony/next";
import { getLocations } from "@/actions/locations";

export const locationsListWidget = createTableWidget({
	action: getLocations,
	fields: [
		{ name: "city" },
		{ name: "country" },
		{ name: "region" },
		{ name: "address" },
	],
});
