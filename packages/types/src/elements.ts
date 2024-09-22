import { ContextUpdater } from "./config";

export type ButtonElement = {
	label: string;
	viewId: string;
};

export type TabElement = {
	label: string;
	viewId: string;
	setContext?: ContextUpdater;
};
