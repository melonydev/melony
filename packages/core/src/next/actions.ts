import { redirect } from "next/navigation";

export const redirectAction = async (path: string) => {
	"use server";
	redirect(path);
};
