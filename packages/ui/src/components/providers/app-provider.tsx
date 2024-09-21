import { AppConfig } from "@melony/types";
import { Toaster } from "../ui/toaster";
import { QueryProvider } from "./query-provider";
import { redirect, useRouter } from "next/navigation";

import { createContext, useContext } from "react";
import { AuthProvider } from "./auth-provider";

export const AppContext = createContext<{
	config: AppConfig;
	navigate: (path: string) => void;
}>({
	config: { title: "Your App Name" },
	navigate: () => {},
});

export function AppProvider({
	children,
	config,
}: {
	children: React.ReactNode;
	config: AppConfig;
}) {
	const router = useRouter();

	const navigate = (path: string) => {
		router.push(path);
	};

	const value = { navigate, config };

	return (
		<AppContext.Provider value={value}>
			<QueryProvider>
				<AuthProvider>{children}</AuthProvider>
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
