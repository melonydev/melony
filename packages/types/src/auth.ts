import { ID } from "./config";

export type Auth = {
	meAction?: () => Promise<User | null>;
	loginAction?: () => Promise<any>;
	logoutAction?: () => Promise<any>;
};

export type User = {
	id: ID;
	email: string | null;
	picture?: string;
	username?: string;
	displayName?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: number;
};
