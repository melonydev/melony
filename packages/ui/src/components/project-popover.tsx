import { stringToColor } from "@/lib/string-to-color";
import { useApp } from "./providers/app-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";
import { ChevronsUpDown, GlobeIcon, PlusIcon } from "lucide-react";

export function ProjectPopover({ title }: { title: string }) {
	const { navigate } = useApp();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage
								src={"https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_12.png"}
							/>
							<AvatarFallback>
								<span className="text-[9px] font-semibold">
									{title.slice(0, 1).toUpperCase()}
								</span>
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{title}</span>
						<span className="truncate text-xs">plan</span>
					</div>
					<ChevronsUpDown className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				align="start"
				side="bottom"
				sideOffset={4}
			>
				<DropdownMenuLabel className="text-xs text-muted-foreground">
					Teams
				</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => {}} className="gap-2 p-2">
					<div className="flex size-6 items-center justify-center rounded-sm border">
						<GlobeIcon className="size-4" />
					</div>
					Team Name
					<DropdownMenuShortcut>⌘{2}</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 p-2">
					<div className="flex size-6 items-center justify-center rounded-md border bg-background">
						<PlusIcon className="size-4" />
					</div>
					<div className="font-medium text-muted-foreground">Add team</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
