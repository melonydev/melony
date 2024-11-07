import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "./ui/breadcrumb";

export function Page({ children }: { children: React.ReactNode }) {
	return (
		<div id="page" className="h-full flex flex-col rounded-md">
			{children}
		</div>
	);
}

export const PageHeader = ({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: JSX.Element | JSX.Element[];
}) => {
	return (
		<header className="sticky z-20 top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
			<div className="flex flex-1 items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="#">{title}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				{actions && <div>{actions}</div>}
			</div>
		</header>
	);
};

export const PageBody = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-1 flex-col gap-4 px-4 pb-4 overflow-auto">
			{children}
		</div>
	);
};
