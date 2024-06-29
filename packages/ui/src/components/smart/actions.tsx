import { Action, Model, Resource } from "@melony/types";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RocketIcon, X } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import React from "react";
import { useAction } from "@/hooks/actions/use-action";

export const Actions = ({
	resource,
	actions,
	docs,
}: {
	resource: Resource;
	actions: Action[];
	docs: any;
}) => {
	const [activeAction, setActiveAction] = React.useState<Action | undefined>();

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">
						<RocketIcon className="w-4 h-4 mr-2" />
						Actions
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="start">
					{actions.map((action, i) => {
						return (
							<DropdownMenuItem
								key={i}
								onClick={() => {
									setActiveAction(action);
								}}
							>
								{action.name}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>

			{activeAction && (
				<ActionDialog
					resource={resource}
					title={activeAction?.name}
					open={!!activeAction}
					onClose={() => {
						setActiveAction(undefined);
					}}
					action={activeAction}
					docs={docs}
				/>
			)}
		</>
	);
};

export function ActionDialog({
	resource,
	open,
	onClose,
	title = "Execute action",
	action,
	docs,
}: {
	resource: Resource;
	open: boolean;
	onClose: () => void;
	title?: string;
	action: Action;
	docs: any;
}) {
	const { mutate, isPending } = useAction({ resource, action });

	const handleAction = () => {
		mutate(
			{ docs },
			{
				onSuccess: () => {
					onClose();
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<div className="flex justify-between items-center">
						<DialogTitle>{title}</DialogTitle>
						<div className="flex gap-2 items-center">
							<DialogClose asChild>
								<Button size="sm" variant="ghost">
									<X className="h-4 w-4" />
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogHeader>
				<div className="p-8">Execute action?</div>
				<DialogFooter className="p-4">
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={() => handleAction()} disabled={isPending}>
						Execute
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
