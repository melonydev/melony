import { Metadata } from "next";
import { appConfig } from "./app-config";
import { AppProvider } from "melony";

import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Saamkroshi",
	description: "Created with melony.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body
				className={
					(appConfig?.ui?.font ? appConfig?.ui?.font?.className : "") + " "
				}
				style={{ height: "100vh" }}
			>
				<AppProvider config={appConfig}>{children}</AppProvider>
			</body>
		</html>
	);
}
