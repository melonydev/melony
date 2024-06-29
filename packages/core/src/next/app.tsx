import Link from "next/link";
import {
	listAction,
	createAction,
	updateAction,
	deleteAction,
	getAction,
	generateModels,
} from "@/prisma";
import {
	AccountPopover,
	AuthProvider,
	AppShell,
	Navigation,
	NavigationItem,
	QueryProvider,
	Protected,
	ProjectPopover,
	// Avatar,
	// AvatarImage,
	// AvatarFallback,
	// Button,
} from "@melony/ui";
import { Config } from "@melony/types";
import { getUserAction, loginAction, logoutAction } from "@/prisma/auth";
import { AppProvider } from "@melony/ui";
import { uploadAction } from "@/prisma/storage";
import { redirectAction } from "./actions";
import { getPathname, mergeResourcesWithModels } from "./utils";

export function makeApp(config?: Config) {
	return async function App({ children }: { children: React.ReactNode }) {
		const pathname = getPathname();

		const models = generateModels();
		const resources = mergeResourcesWithModels([]);

		const pages = config?.pages || [];

		return (
			<QueryProvider>
				<AppProvider
					config={config}
					resources={resources}
					models={models}
					listAction={listAction}
					getAction={getAction}
					createAction={createAction}
					updateAction={updateAction}
					deleteAction={deleteAction}
					loginAction={loginAction}
					logoutAction={logoutAction}
					getUserAction={getUserAction}
					uploadAction={uploadAction}
					redirectAction={redirectAction}
				>
					<AuthProvider>
						<Protected>
							<AppShell
								nav={
									<div>
										<div className="p-1">
											<ProjectPopover title={config?.ui?.title || "App Name"} />
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

										{/* <hr style={{ margin: "8px 0" }} />

										<Navigation initialPathname={modelName}>
											{resources.map((resource) => {
												return (
													<NavigationItem
														key={resource.model}
														as={Link}
														icon=""
														title={resource?.label || resource.model}
														href={`/${resource.model}`}
													/>
												);
											})}
										</Navigation> */}
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
	};
}
