import { cn } from "../lib";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
	isCollapsed: boolean;
	nav: JSX.Element | React.ReactNode;
	logo: JSX.Element;
	bottomNav?: JSX.Element;
}

export function Sidebar({
	className,
	isCollapsed,
	nav,
	logo,
	bottomNav,
}: SidebarProps) {
	return (
		<aside
			className={cn(
				`border-r fixed left-0 right-0 top-0 z-50 w-full flex flex-col transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? "md:w-14" : "md:w-60"}`,
				className,
			)}
		>
			<div className="p-2">{logo}</div>
			<div className="p-2 flex-1 overflow-y-auto">{nav}</div>

			<div className="p-2">{bottomNav}</div>
		</aside>
	);
}
