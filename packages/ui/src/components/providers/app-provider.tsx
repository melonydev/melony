import { Toaster } from "../ui/toaster";
import { QueryProvider } from "./query-provider";

import { createContext, useContext } from "react";

export const AppContext = createContext<{
	navigate: (path: string) => void;
}>({
	navigate: () => {},
});

export function AppProvider({
	children,
	navigate,
}: {
	children: React.ReactNode;
	navigate: (path: string) => void;
}) {
	const value = { navigate };

	return (
		<AppContext.Provider value={value}>
			<QueryProvider>
				{children}
				<Toaster />
			</QueryProvider>
		</AppContext.Provider>
	);
}

export const useApp = () => {
	const context = useContext(AppContext);

	if (context === undefined)
		throw new Error("useApp must be used within a AppProvider");

	return context;
};
