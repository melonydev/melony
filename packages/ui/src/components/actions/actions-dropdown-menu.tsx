import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Action } from "@melony/types";
import { MoreHorizontal } from "lucide-react";
import { ActionsDropdownMenuItem } from "./actions-dropdown-menu-item";
import { useApp } from "../providers/app-provider";

export function ActionsDropdownMenu({
	resourceId,
	data,
}: {
	resourceId: string;
	data: any;
}) {
	const { navigate, config } = useApp();

	const resource = config?.resources?.[resourceId];
	const actions = resource?.actions || {};

	const filteredActions = Object.entries(actions).reduce<
		Record<string, Action>
	>((acc, [key, value]) => {
		if (value?.isDocRequired) {
			acc[key] = value;
		}
		return acc;
	}, {});

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
					{Object.keys(filteredActions).map((actionKey) => {
						const action = actions[actionKey];

						if (!action) return null;

						return (
							<ActionsDropdownMenuItem
								key={actionKey}
								action={action}
								onClick={() => {
									// onClickAction({ action, data });
									navigate(`/${resourceId}/${actionKey}/${data?.id}`);
								}}
							/>
						);
					})}
				</DropdownMenuGroup>
				{/* <DropdownMenuSeparator /> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
