import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Action, ID } from "@melony/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { FormFields } from "../form-fields";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export function ActionDialog({
	open,
	onClose,
	action,
	data,
	id,
}: {
	open?: boolean;
	onClose: () => void;
	action: Action;
	data?: any;
	id: ID;
}) {
	const { toast } = useToast();

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: [action.id],
		mutationFn: action?.handler,
	});

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		values: data,
	});

	function onSubmit(data?: any) {
		mutate(
			{ id, data },
			{
				onSuccess: () => {
					// toast({
					// 	title: "Executed successfully",
					// });
				},
				onError: (error) => {
					toast({
						title: error.message,
						description: (
							<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
								<code className="text-white">
									{JSON.stringify(data, null, 2)}
								</code>
							</pre>
						),
						variant: "destructive",
					});
				},
			},
		);
	}

	return (
		<Dialog open={open} onOpenChange={(open) => !open && onClose()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{action?.title || action.id}</DialogTitle>
					<DialogDescription>{action?.description || id}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 p-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{action.type === "custom" && action?.fields && (
								<FormFields fields={action.fields} />
							)}

							<Button type="submit" disabled={isPending}>
								{isPending ? "Executing..." : "Execute"}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
