import { makeApp, makeTableWidget } from "melony/next";
import {
	crateLocation,
	listLocations,
	listLocationsQueryAction,
} from "./actions/locations";
import { prisma } from "@/lib/prisma";

export default makeApp({
	ui: {
		title: "Ticketrue",
	},
	pages: [
		{
			title: "Dashboard",
			icon: "Gauge",
			path: "/",
			widgets: [
				makeTableWidget({
					title: "Locations",
					fields: [
						{
							name: "city",
						},
						{
							name: "region",
						},
						{
							name: "country",
						},
					],
					queryAction: {
						key: "listLocations",
						handler: listLocationsQueryAction,
					},
					headerActions: [
						{
							name: "Create Location",
							key: "listLocations",
							handler: crateLocation,
						},
					],
				}),
			],
		},
		{
			title: "Scans History",
			icon: "ScanBarcode",
			path: "/scans",
			widgets: [
				makeTableWidget({
					title: "Scans",
					fields: [
						{
							name: "deviceId",
						},
					],
					queryAction: {
						key: "listScans",
						handler: async () => {
							"use server";
							const res = await prisma.scan.findMany();
							return res;
						},
					},
				}),
			],
		},
	],
});
