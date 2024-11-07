import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "./providers/auth-provider";
import { stringToColor } from "@/lib/string-to-color";
import { Button } from "./ui/button";
import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { ModeTogglSubMenu } from "./mode-toggle";

export function AccountPopover() {
	const { user, logout, login } = useAuth();

	if (!user && !!login)
		return (
			<Button
				variant="ghost"
				onClick={() => {
					login({});
				}}
			>
				Login
			</Button>
		);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage
							src={
								"https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png"
							}
							alt={user?.displayName || ""}
						/>
						<AvatarFallback>
							<span className="text-[9px] font-semibold">
								{(user?.displayName || "").slice(0, 2).toUpperCase()}
							</span>
						</AvatarFallback>
					</Avatar>

					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{user?.displayName}</span>
						<span className="truncate text-xs">{user?.email}</span>
					</div>
					<ChevronsUpDown className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side="bottom"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage
								src={
									"https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png"
								}
								alt={user?.displayName || ""}
							/>
							<AvatarFallback>
								<span className="text-[9px] font-semibold">
									{(user?.displayName || "").slice(0, 2).toUpperCase()}
								</span>
							</AvatarFallback>
						</Avatar>

						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">
								{user?.displayName}
							</span>
							<span className="truncate text-xs">{user?.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<ModeTogglSubMenu />

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout && logout({})}>
					<LogOutIcon className="size-4 mr-2" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
