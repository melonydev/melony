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
import { stringToColor } from "@/lib/string-to-color";

export function ProjectPopover({ title }: { title: string }) {
	return (
		<div className="flex flex-col flex-1 gap-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center cursor-pointer hover:bg-muted rounded-md px-2 py-1">
						<Avatar className="h-7 w-7 mr-2 rounded">
							<AvatarImage />
							<AvatarFallback
								className="text-xs rounded"
								// style={{
								// 	backgroundColor: stringToColor(title),
								// }}
							>
								{title.slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="text-left">
							<div className="text-sm">{title}</div>
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="start">
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
