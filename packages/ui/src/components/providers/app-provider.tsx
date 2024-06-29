"use client";

import {
	Config,
	CreateActionPayload,
	DeleteActionPayload,
	GetActionPayload,
	ListActionPayload,
	LoginActionPayload,
	Model,
	Resource,
	UpdateActionPayload,
} from "@melony/types";
import { createContext, useContext } from "react";

type DefaultActions = {
	listAction: ({ resource }: ListActionPayload) => Promise<any>;
	getAction: ({ resource, where }: GetActionPayload) => Promise<any>;
	createAction: ({ resource, data }: CreateActionPayload) => Promise<any>;
	updateAction: ({ resource, data }: UpdateActionPayload) => Promise<any>;
	deleteAction: ({ resource, where }: DeleteActionPayload) => Promise<any>;
	loginAction: (payload: LoginActionPayload) => Promise<any>;
	logoutAction: () => Promise<any>;
	getUserAction: () => Promise<any>;
	uploadAction: ({ formData }: { formData: FormData }) => Promise<any>;
	redirectAction: (path: string) => Promise<any>;
};

type AppProviderProps = {
	config?: Config;
	children: React.ReactNode;
	resources: Resource[];
	models: Model[];
} & DefaultActions;

const AppContext = createContext<
	{
		config: Config;
		resources: Resource[];
		models: Model[];
	} & DefaultActions
>({
	config: {},
	resources: [],
	models: [],
	listAction: () => Promise.resolve(),
	getAction: () => Promise.resolve(),
	createAction: () => Promise.resolve(),
	updateAction: () => Promise.resolve(),
	deleteAction: () => Promise.resolve(),
	loginAction: () => Promise.resolve(),
	logoutAction: () => Promise.resolve(),
	getUserAction: () => Promise.resolve(),
	uploadAction: () => Promise.resolve(),
	redirectAction: () => Promise.resolve(),
});

export function AppProvider({
	children,
	resources,
	models,
	config = {},
	...rest
}: AppProviderProps) {
	const value = { models, resources, config, ...rest };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
	const context = useContext(AppContext);

	if (context === undefined)
		throw new Error("useApp must be used within a AppProvider");

	return context;
};
