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
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./providers/auth-provider";

export function AccountPopover() {
	const { user, logout } = useAuth();

	const { mutate: handleLogout } = useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
	});

	return (
		<div className="flex flex-col gap-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center cursor-pointer hover:bg-muted rounded-lg px-2 py-1">
						<Avatar className="h-7 w-7">
							<AvatarImage
								src={user?.picture || ""}
								alt={user?.fullName || ""}
							/>
							<AvatarFallback className="text-xs">
								{(user?.fullName || "").slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="text-left">
							<div className="text-sm">{user?.fullName}</div>
							<div className="text-xs opacity-60">{user?.email}</div>
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="start">
					<DropdownMenuLabel>{user?.email || user?.id}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => handleLogout({})}>
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
