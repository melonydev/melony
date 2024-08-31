import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Action, Resource } from "@melony/types";
import { MoreHorizontal } from "lucide-react";
import { ActionsDropdownMenuItem } from "./actions-dropdown-menu-item";

export function ActionsDropdownMenu({
	resource,
	data,
	onClickAction,
}: {
	resource: Resource;
	data: any;
	onClickAction: (params: { action: Action; data: any }) => void;
}) {
	const resourceDeleteOneAction = (resource?.actions || []).find(
		(x) => x.type === "deleteOne",
	);

	const filteredActions = (resource?.actions || []).filter(
		(x) => x.type === "custom",
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuGroup>
					{resourceDeleteOneAction && (
						<ActionsDropdownMenuItem
							action={resourceDeleteOneAction}
							onClick={() => {
								onClickAction({ action: resourceDeleteOneAction, data });
							}}
						/>
					)}

					{filteredActions.map((action) => (
						<ActionsDropdownMenuItem
							key={action.id}
							action={action}
							onClick={() => {
								onClickAction({ action, data });
							}}
						/>
					))}
				</DropdownMenuGroup>
				{/* <DropdownMenuSeparator /> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
