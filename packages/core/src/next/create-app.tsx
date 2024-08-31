import "@melony/ui/src/globals.css";

import { AppProvider, AuthProvider } from "@melony/ui";
import { redirect } from "next/navigation";
import { AppConfig } from "@melony/types";

export function createApp({ ui, auth }: AppConfig) {
	return async function RootLayout({
		children,
	}: Readonly<{
		children: React.ReactNode;
	}>) {
		return (
			<html lang="en">
				<head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
				</head>
				<body className={(ui?.font ? ui?.font?.className : "") + " "}>
					<AppProvider
						navigate={async (path: string) => {
							"use server";
							redirect(path);
						}}
					>
						<AuthProvider auth={auth}>{children}</AuthProvider>
					</AppProvider>
				</body>
			</html>
		);
	};
}
