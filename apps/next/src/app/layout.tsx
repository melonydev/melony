import { Metadata } from "next";
import { createApp } from "melony/next";
import { appConfig } from "./app-config";

export const metadata: Metadata = {
	title: "Saamkroshi",
	description: "Created with melony.dev",
};

export default createApp(appConfig);
