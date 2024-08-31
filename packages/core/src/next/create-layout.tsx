import { AppConfig } from "@melony/types";
import {
	AccountPopover,
	AppShell,
	Navigation,
	NavigationItem,
	ProjectPopover,
} from "@melony/ui";
import Link from "next/link";

export function createLayout({
	title = "Untitled",
	resources = [],
}: AppConfig) {
	return async function Layout({
		children,
	}: Readonly<{
		children: React.ReactNode;
	}>) {
		// const isAuthenticated = await auth?.isAuthenticated();

		return (
			<AppShell
				logo={
					<div className="flex items-center gap-1">
						<ProjectPopover title={title} />
						<AccountPopover />
					</div>
				}
				nav={
					<Navigation>
						<>
							{resources.map((resource) => {
								// if (!isAuthenticated && !task?.isPublic) {
								// 	return null;
								// }

								return (
									<NavigationItem
										key={resource.id}
										as={Link}
										href={`/${resource.id}`}
										title={resource?.title || resource.id}
									/>
								);
							})}
						</>
					</Navigation>
				}
			>
				{children}
			</AppShell>
		);
	};
}
