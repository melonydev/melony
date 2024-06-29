"use client";

import { User } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { useApp } from "./app-provider";

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthContext = createContext<{
	user: User | null;
	handleLogin: () => void;
	handleLogout: () => void;
}>({ user: null, handleLogin: () => {}, handleLogout: () => {} });

export function AuthProvider({ children }: AuthProviderProps) {
	const { getUserAction } = useApp();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["getUser"],
		queryFn: () => getUserAction(),
	});

	const handleLogin = () => {
		refetch();
	};

	const handleLogout = () => {
		refetch();
	};

	const value = { user: data, handleLogin, handleLogout };

	if (isLoading)
		return (
			<div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
				<LoadingSpinner />
				<div className="text-sm">Loading...</div>
			</div>
		);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined)
		throw new Error("useAuth must be used within a AuthProvider");

	return context;
};
