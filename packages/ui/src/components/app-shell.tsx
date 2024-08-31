import { Sidebar } from "./sidebar";

export function AppShell({
	children,
	logo,
	nav,
}: {
	children: JSX.Element | React.ReactNode;
	logo: JSX.Element;
	nav: JSX.Element | React.ReactNode;
}) {
	// const [isCollapsed, setIsCollapsed] = useIsCollapsed();
	const isCollapsed = false;

	return (
		<div className="relative overflow-hidden min-h-screen bg-background">
			<Sidebar logo={logo} nav={nav} isCollapsed={isCollapsed} />
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
