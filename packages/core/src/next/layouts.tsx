import Link from "next/link";
import {
	AccountPopover,
	AuthProvider,
	AppShell,
	Navigation,
	NavigationItem,
	QueryProvider,
	Protected,
	ProjectPopover,
} from "@melony/ui";
import { AppProvider } from "@melony/ui";
import { getPages, getPathname } from "./utils";

export async function MelonyApp({ children }: { children: React.ReactNode }) {
	const pathname = getPathname();

	const pages = await getPages();

	return (
		<QueryProvider>
			<AppProvider>
				<AuthProvider>
					<Protected>
						<AppShell
							nav={
								<div>
									<div className="p-1">
										<ProjectPopover title={"App Name"} />
									</div>

									<div className="p-2">
										<div className="my-4">
											<Navigation initialPathname={pathname}>
												{pages.map((page) => {
													return (
														<NavigationItem
															key={page.path}
															as={Link}
															icon={page?.icon}
															title={page.title}
															href={`${page.path}`}
														/>
													);
												})}
											</Navigation>
										</div>
									</div>
								</div>
							}
							account={
								<div className="p-1">
									<AccountPopover />
								</div>
							}
						>
							{children}
						</AppShell>
					</Protected>
				</AuthProvider>
			</AppProvider>
		</QueryProvider>
	);
}
