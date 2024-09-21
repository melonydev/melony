import { User } from "./auth";

export type HasAccess = (params: {
	user: User | null;
}) => Promise<boolean> | boolean;
