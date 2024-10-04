"use client";

import * as icons from "lucide-react";
import { cn } from "../lib";
import React from "react";
import { usePathname } from "next/navigation";

const NavigationContext = React.createContext<{
	activePathname: string;
	setPathname: (pathname: string) => void;
}>({
	activePathname: "",
	setPathname: () => {},
});

export function Navigation({
	children,
	initialPathname = "",
}: {
	children: JSX.Element | JSX.Element[];
	initialPathname?: string;
}) {
	const [activePathname, setActivePathname] = React.useState(initialPathname);

	const setPathname = (pathname: string) => {
		setActivePathname(pathname);
	};

	const value = { activePathname, setPathname };

	return (
		<NavigationContext.Provider value={value}>
			<div className="flex flex-col">{children}</div>
		</NavigationContext.Provider>
	);
}

export function NavigationItem({
	id,
	title,
	onClick,
}: {
	id?: string;
	title?: string;
	icon?: string;
	onClick?: () => void;
}) {
	const navContext = React.useContext(NavigationContext);

	const pathname = usePathname();

	return (
		<div
			className={cn(
				"px-3 h-8 text-foreground/60 relative cursor-pointer inline-flex overflow-hidden items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-sm justify-start",
				{
					"text-accent-foreground bg-muted": pathname.includes(id || ""),
				},
			)}
			onClick={() => {
				onClick && onClick();
			}}
		>
			{/* {Icon && <Icon className="h-4 w-4 mr-3" />} */}
			<span className="block truncate">{title}</span>
		</div>
	);
}
