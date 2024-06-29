"use client";

import { Config } from "@melony/types";
import { createContext, useContext } from "react";

type DefaultActions = {};

type AppProviderProps = {
	config?: Config;
	children: React.ReactNode;
} & DefaultActions;

const AppContext = createContext<{} & DefaultActions>({
	config: {},
});

export function AppProvider({ children, ...rest }: AppProviderProps) {
	const value = { ...rest };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
	const context = useContext(AppContext);

	if (context === undefined)
		throw new Error("useApp must be used within a AppProvider");

	return context;
};
