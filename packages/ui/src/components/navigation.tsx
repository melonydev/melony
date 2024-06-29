"use client";

import * as icons from "lucide-react";
import { cn } from "../lib";
import React from "react";

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
	as,
	title,
	icon,
	href,
}: {
	as: any;
	title?: string;
	icon?: string;
	href: string;
}) {
	const Comp = as || "div";
	// @ts-ignore
	const Icon = icons?.[icon || "Folder"];

	const navContext = React.useContext(NavigationContext);

	return (
		<Comp
			className={cn(
				"px-2 h-8 text-foreground/60 relative cursor-pointer inline-flex overflow-hidden items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-sm justify-start",
				{
					"text-accent-foreground bg-muted": navContext.activePathname === href,
				},
			)}
			href={href}
			onClick={() => {
				navContext.setPathname(href);
			}}
		>
			{Icon && <Icon className="h-4 w-4 mr-2" />}
			<span className="block truncate">{title}</span>
		</Comp>
	);
}
