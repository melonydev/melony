import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { Field } from "@melony/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const formatDateFromNow = (date?: string) => {
	return dayjs(date).fromNow();
};

export const formatDate = (date: string) => {
	return dayjs(date).format("MMM D, YYYY");
};

export const formatDateTime = (date: string) => {
	return dayjs(date).format("MMM D, YYYY h:mm A");
};

export const formatDateToISOLocal = (date: string) => {
	return dayjs(date).format();
};
