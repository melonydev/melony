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

export function ProjectPopover({ title }: { title: string }) {
	const { user } = useAuth();

	return (
		<div className="flex flex-col gap-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center cursor-pointer hover:bg-muted rounded-lg px-2 py-1">
						<Avatar className="h-7 w-7 mr-2">
							<AvatarImage src={user?.image || ""} alt={user?.name || ""} />
							<AvatarFallback className="text-xs">
								{title.slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="text-left">
							<div className="text-sm">{title}</div>
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<span>Settings</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
