import { Model, Resource } from "@melony/types";

import { Button } from "../ui/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { SmartForm } from "./smart-form";
import { useCreate } from "@/hooks";
import { X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";

export function CreateDocDialog({
	resource,
	open,
	onClose,
}: {
	resource: Resource;
	open: boolean;
	onClose: () => void;
}) {
	const { toast } = useToast();

	const { mutate: create, isPending: isCreating } = useCreate({
		resource,
	});

	return (
		<Sheet open={open} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="w-[500px] sm:max-w-[500px]">
				<SheetHeader>
					<SheetTitle>Create</SheetTitle>
					<SheetDescription>
						<SmartForm
							resource={resource}
							onSubmit={(data) => {
								create(data, {
									onSuccess: () => {
										onClose();
									},
									onError: (err) => {
										toast({
											title: "Error",
											description: err.message,
										});
									},
								});
							}}
							isSubmitting={isCreating}
						/>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);

	// return (
	// 	<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
	// 		<DialogContent className="max-w-[44rem]">
	// 			<DialogHeader>
	// 				<div className="flex justify-between items-center">
	// 					<DialogTitle>Create</DialogTitle>
	// 					<div className="flex gap-2 items-center">
	// 						<DialogClose asChild>
	// 							<Button size="sm" variant="ghost">
	// 								<X className="h-4 w-4" />
	// 							</Button>
	// 						</DialogClose>
	// 					</div>
	// 				</div>
	// 			</DialogHeader>

	// 			<DialogBody>
	// 				<SmartForm
	// 					resource={resource}
	// 					onSubmit={(data) => {
	// 						create(data, {
	// 							onSuccess: () => {
	// 								onClose();
	// 							},
	// 							onError: (err) => {
	// 								toast({
	// 									title: "Error",
	// 									description: err.message,
	// 								});
	// 							},
	// 						});
	// 					}}
	// 					isSubmitting={isCreating}
	// 				/>
	// 			</DialogBody>
	// 		</DialogContent>
	// 	</Dialog>
	// );
}
