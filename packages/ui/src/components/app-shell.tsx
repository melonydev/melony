import { Sidebar } from "./sidebar";
import { Toaster } from "./ui/toaster";

export function AppShell({
	children,
	nav,
	account,
}: {
	children: JSX.Element | React.ReactNode;
	nav: JSX.Element | React.ReactNode;
	account: JSX.Element | React.ReactNode;
}) {
	// const [isCollapsed, setIsCollapsed] = useIsCollapsed();
	const isCollapsed = false;

	return (
		<div className="relative overflow-hidden min-h-screen">
			<Sidebar nav={nav} account={account} isCollapsed={isCollapsed} />
			<div
				className={`flex flex-col min-h-screen overflow-x-hidden transition-[margin] md:overflow-y-hidden ${isCollapsed ? "md:ml-14" : "md:ml-60"} h-full`}
			>
				<main id="content" className="flex-1">
					{children}
				</main>
				<Toaster />
			</div>
		</div>
	);
}
