import { z } from "zod";

export const signInPayloadSchema = z.object({
	email: z.string().email().min(1, "Email cannot be blank"),
	password: z.string().min(1, "Password cannot be blank"),
});
