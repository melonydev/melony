import { Model, Resource } from "@melony/types";

import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";
import { ConfirmDialog } from "../confirm-dialog";
import { useDelete } from "@/hooks";

export function DocMenu({ data, resource }: { data: any; resource: Resource }) {
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

	const { mutate: remove, isPending: isRemoving } = useDelete({
		resource,
		onSuccess: () => {
			setShowDeleteDialog(false);
		},
	});

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="sm" variant="ghost">
						<Ellipsis className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => {
							setShowDeleteDialog(true);
						}}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<ConfirmDialog
				open={showDeleteDialog}
				onClose={() => setShowDeleteDialog(false)}
				onConfirm={() => {
					remove({ id: data?.id });
				}}
				isConfirming={isRemoving}
			/>
		</>
	);
}
