import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ActionsDropdownMenuItem } from "./actions-dropdown-menu-item";
import { useApp } from "../providers/app-provider";
import { ListViewProps } from "@melony/types";

export function ActionsDropdownMenu({
	viewId,
	data,
}: {
	viewId: string;
	data: any;
}) {
	const { navigate, config } = useApp();

	const view = config?.views?.[viewId] as ListViewProps;

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
					{(view?.itemButtons || []).map((buttonElement) => {
						return (
							<ActionsDropdownMenuItem
								key={buttonElement.viewId}
								label={buttonElement.label}
								onClick={() => {
									navigate(`/${buttonElement.viewId}?id=${data?.id}`);
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
