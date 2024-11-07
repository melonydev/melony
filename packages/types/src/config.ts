import { Auth } from "./auth";
import { FilterItem } from "./filters";
import { UI } from "./ui";
import { View } from "./views";

export type AppConfig = {
	title: string;
	ui?: UI;
	auth?: Auth;
	views?: Record<string, View>;
};

export type ID = string | number;

export type SelectOption = {
	label: string;
	value: string;
	image?: string;
	color?: string;
};

export type BaseContext = { searchParams?: any; initialFilter?: FilterItem[] };

export type ContextUpdater = (
	prevContext: BaseContext,
) => Promise<Partial<BaseContext>>;
