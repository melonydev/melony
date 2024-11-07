import { FolderIcon, HomeIcon, MoreHorizontalIcon } from "lucide-react";
import { AccountPopover } from "./account-popover";
import { ProjectPopover } from "./project-popover";
import { useApp } from "./providers/app-provider";
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarFooter,
	SidebarInset,
	SidebarTrigger,
	SidebarRail,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";

export function AppShell({
	children,
}: {
	children: JSX.Element | React.ReactNode;
}) {
	const pathname = usePathname();
	const { config, navigate } = useApp();

	const title = config.title;
	const views = config?.views || {};

	return (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<ProjectPopover title={title} />
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					{/* <SidebarGroup>
						<SidebarGroupLabel>Platform</SidebarGroupLabel>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<Collapsible
									key={item.title}
									asChild
									defaultOpen={item.isActive}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.title}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild>
															<a href={subItem.url}>
																<span>{subItem.title}</span>
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroup> */}

					{/* <SidebarGroup>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<div
										className={cn("cursor-pointer", {
											"bg-sidebar-accent": pathname === "/",
										})}
										onClick={() => {
											navigate(`/`);
										}}
									>
										<HomeIcon className="size-4" />
										<span>Home</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup> */}

					<SidebarGroup>
						<SidebarGroupLabel>Views</SidebarGroupLabel>
						<SidebarMenu>
							{Object.keys(views).map((viewId) => {
								const view = views[viewId];

								if (!view) return null;
								if (!view?.showInNavigation) return null;

								return (
									<SidebarMenuItem key={viewId}>
										<SidebarMenuButton asChild>
											<div
												className={cn("cursor-pointer", {
													"bg-sidebar-accent": pathname.includes(viewId),
												})}
												onClick={() => {
													navigate(`/${viewId}`);
												}}
											>
												<FolderIcon className="size-4" />
												<span>{view?.title || viewId}</span>
											</div>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<AccountPopover />
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset className="min-h-screen h-screen">{children}</SidebarInset>
		</SidebarProvider>
	);
}
