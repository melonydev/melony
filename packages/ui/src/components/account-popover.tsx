import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "./providers/auth-provider";
import { stringToColor } from "@/lib/string-to-color";
import { Button } from "./ui/button";
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
		<div className="flex flex-col gap-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center cursor-pointer hover:bg-muted rounded-lg px-2 py-1">
						<Avatar className="h-7 w-7 border shadow mr-2">
							<AvatarImage
								src={user?.picture || ""}
								alt={user?.displayName || ""}
							/>
							<AvatarFallback>
								<div
									className="absolute opacity-40 inset-0"
									style={{
										backgroundColor: stringToColor(user?.displayName || ""),
									}}
								></div>
								<span className="text-[9px] font-semibold">
									{(user?.displayName || "").slice(0, 2).toUpperCase()}
								</span>
							</AvatarFallback>
						</Avatar>

						<div className="text-left">
							<div className="">{user?.displayName}</div>
							{/* <div className="text-xs opacity-60">{user?.email}</div> */}
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="start">
					<DropdownMenuLabel>
						<div className="text-left">
							<div className="">{user?.displayName}</div>
							<div className="text-xs opacity-60 font-normal">
								{user?.email || user?.id}
							</div>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<ModeTogglSubMenu />

					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => logout && logout({})}>
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
