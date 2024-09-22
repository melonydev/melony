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

export function AccountPopover() {
	const { user, logout } = useAuth();

	if (!user) return null;

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
							<div className="text-sm">{user?.displayName}</div>
							<div className="text-xs opacity-60">{user?.email}</div>
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="start">
					<DropdownMenuLabel>{user?.email || user?.id}</DropdownMenuLabel>
					<DropdownMenuSeparator />
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
