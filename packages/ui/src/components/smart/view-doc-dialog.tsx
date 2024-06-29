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
import { useUpdate } from "@/hooks";
import { X } from "lucide-react";
import { SmartTabbedRelatedLists } from "./smart-tabbed-related-lists";
import { Actions } from "./actions";
import { DocMenu } from "./doc-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";

export function ViewDocDialog({
	data,
	resource,
	open,
	onClose,
}: {
	data: any;
	resource: Resource;
	open: boolean;
	onClose: () => void;
}) {
	const { mutate: update, isPending: isUpdating } = useUpdate({
		resource,
		onSuccess: () => {
			onClose();
		},
	});

	return (
		<Sheet open={open} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:w-[500px] sm:max-w-[500px] xl:w-[740px] xl:max-w-[740px]">
				<SheetHeader>
					<SheetTitle>Update</SheetTitle>
					<SheetDescription>
						<div className="flex flex-col gap-4">
							<SmartForm
								resource={resource}
								values={data}
								onSubmit={update}
								isSubmitting={isUpdating}
							/>

							<SmartTabbedRelatedLists resource={resource} doc={data || {}} />
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-[80rem]">
				<DialogHeader>
					<div className="flex justify-between items-center">
						<DialogTitle>Update</DialogTitle>
						<div className="flex gap-1 items-center">
							<Actions
								resource={resource}
								docs={[data]}
								actions={resource?.actions || []}
							/>

							<DocMenu resource={resource} data={data} />

							<DialogClose asChild>
								<Button size="sm" variant="ghost">
									<X className="h-4 w-4" />
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogHeader>

				<DialogBody>
					<div className="flex flex-col gap-4">
						<SmartForm
							resource={resource}
							values={data}
							onSubmit={update}
							isSubmitting={isUpdating}
						/>

						<SmartTabbedRelatedLists resource={resource} doc={data || {}} />
					</div>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
}
