import { Resource } from "./resources";
import { UI } from "./ui";

export type AppConfig = {
	title: string;
	ui?: UI;
	resources?: Record<string, Resource>;
};

export type ID = string | number;

export type SelectOption = {
	label: string;
	value: string;
	image?: string;
	color?: string;
};
