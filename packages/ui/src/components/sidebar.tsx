import { cn } from "../lib";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
	isCollapsed: boolean;
	nav: JSX.Element | React.ReactNode;
	account: JSX.Element | React.ReactNode;
}

export function Sidebar({
	className,
	isCollapsed,
	nav,
	account,
}: SidebarProps) {
	return (
		<aside
			className={cn(
				`fixed left-0 right-0 top-0 border-r z-50 w-full flex flex-col transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? "md:w-14" : "md:w-60"}`,
				className,
			)}
		>
			<div className="flex-1 overflow-y-auto">{nav}</div>

			<div className="">{account}</div>
		</aside>
	);
}
