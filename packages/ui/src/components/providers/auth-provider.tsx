"use client";

import {
	Auth,
	LoginActionParams,
	LogoutActionParams,
	User,
} from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type AuthProviderProps = {
	children: React.ReactNode;
	auth?: Auth;
};

export const AuthContext = createContext<{
	user: User | null;
	login?: (params: LoginActionParams) => Promise<any>;
	logout?: (params: LogoutActionParams) => Promise<any>;
}>({
	user: null,
});

export function AuthProvider({ children, auth }: AuthProviderProps) {
	const loginAction = (auth?.actions || []).find((x) => x.type === "login");
	const logoutAction = (auth?.actions || []).find((x) => x.type === "logout");
	const getUserAction = (auth?.actions || []).find((x) => x.type === "getUser");

	const { data: user, isLoading } = useQuery({
		queryKey: ["getUser"],
		queryFn: () => getUserAction && getUserAction.handler({}),
	});

	if (isLoading) return <>Loading user...</>;

	const value = {
		user,
		login: loginAction?.handler,
		logout: logoutAction?.handler,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined)
		throw new Error("useAuth must be used within a AuthProvider");

	return context;
};
