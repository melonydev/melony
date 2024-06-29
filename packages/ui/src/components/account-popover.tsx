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
import { useApp } from "./providers/app-provider";

export function AccountPopover() {
	const { user, handleLogout } = useAuth();

	const { mutate: logout } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => Promise.resolve({}),
		onSuccess: () => {
			handleLogout();
		},
	});

	return (
		<div className="flex flex-col gap-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center cursor-pointer hover:bg-muted rounded-lg px-2 py-1">
						<Avatar className="h-7 w-7 mr-2">
							<AvatarImage src={user?.image || ""} alt={user?.name || ""} />
							<AvatarFallback className="text-xs">
								{(user?.name || "").slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="text-left">
							<div className="text-sm">{user?.name}</div>
							<div className="text-xs opacity-60">{user?.email}</div>
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => logout()}>
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
