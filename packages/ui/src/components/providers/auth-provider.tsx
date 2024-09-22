"use client";

import { User } from "@melony/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useApp } from "./app-provider";
import { Centered } from "../centered";
import { LoadingSpinner } from "../loading-spinner";

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthContext = createContext<{
	user: User | null;
	login?: (params: any) => any;
	logout?: (params: any) => any;
}>({
	user: null,
});

export function AuthProvider({ children }: AuthProviderProps) {
	const { config } = useApp();

	const authResourceActions: any = {};

	const meAction = authResourceActions["me"];
	const loginAction = authResourceActions["login"];
	const logoutAction = authResourceActions["logout"];

	const { data: user, isLoading } = useQuery({
		queryKey: ["me"],
		queryFn: () => meAction && meAction.execute({}),
		refetchOnWindowFocus: false,
		retry: 0,
	});

	const { mutate: login } = useMutation<any, any, any>({
		mutationKey: ["login"],
		mutationFn: loginAction?.execute,
	});

	const { mutate: logout } = useMutation<any, any, any>({
		mutationKey: ["logout"],
		mutationFn: logoutAction?.execute,
	});

	if (isLoading)
		return (
			<Centered>
				<LoadingSpinner />
			</Centered>
		);

	const value = {
		user: (user as User) || null,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined)
		throw new Error("useAuth must be used within a AuthProvider");

	return context;
};
