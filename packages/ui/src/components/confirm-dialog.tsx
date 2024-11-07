import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

export function ConfirmDialog({
	open,
	onClose,
	title = "Confirm",
	onConfirm,
	isConfirming,
}: {
	open: boolean;
	onClose: () => void;
	title?: string;
	onConfirm: () => void;
	isConfirming?: boolean;
}) {
	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				Are you sure?
				<DialogFooter>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={onConfirm}
						disabled={isConfirming}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
