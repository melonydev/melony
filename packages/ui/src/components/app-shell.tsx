import { AccountPopover } from "./account-popover";
import { Navigation, NavigationItem } from "./navigation";
import { ProjectPopover } from "./project-popover";
import { useApp } from "./providers/app-provider";
import { Sidebar } from "./sidebar";

export function AppShell({
	children,
}: {
	children: JSX.Element | React.ReactNode;
}) {
	// const [isCollapsed, setIsCollapsed] = useIsCollapsed();
	const isCollapsed = false;

	const { config, navigate } = useApp();

	const title = config.title;
	const views = config?.views || {};

	const logo = (
		<div className="flex items-center gap-1">
			<ProjectPopover title={title} />
		</div>
	);

	const nav = (
		<Navigation>
			<>
				{Object.keys(views).map((viewId) => {
					const view = views[viewId];

					if (!view) return null;
					if (!view?.showInNavigation) return null;

					return (
						<NavigationItem
							key={viewId}
							id={viewId}
							title={view?.title || viewId}
							onClick={() => {
								navigate(`/${viewId}`);
							}}
						/>
					);
				})}
			</>
		</Navigation>
	);

	const bottomNav = <AccountPopover />;

	return (
		<div className="relative overflow-hidden min-h-screen bg-background">
			<Sidebar
				logo={logo}
				nav={nav}
				isCollapsed={isCollapsed}
				bottomNav={bottomNav}
			/>
			<div
				className={`flex flex-col h-screen overflow-hidden transition-[margin] md:overflow-y-hidden ${isCollapsed ? "md:ml-14" : "md:ml-60"} h-full`}
			>
				<main id="content" className="flex flex-col h-full p-2">
					{children}
				</main>
			</div>
		</div>
	);
}
