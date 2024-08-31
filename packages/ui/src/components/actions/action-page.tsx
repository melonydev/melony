import { Action, AuthAction, ID, Resource } from "@melony/types";
import { useMutation } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { FormFields } from "../form-fields";

export function ActionPage({
	resource,
	action,
	id,
	ctx,
}: {
	resource: Resource;
	action: Action;
	id?: ID;
	ctx: any;
}) {
	const { toast } = useToast();

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: [action.id],
		mutationFn: action?.handler,
	});

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		values: {},
	});

	function onSubmit(data?: any) {
		mutate(
			{ data },
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
		<Page>
			<PageHeader>
				<div className="h-full flex items-center justify-between">
					<div className="flex flex-col">
						<div className="font-semibold">
							{action?.title || action.id} • Edit
						</div>
						{action?.description && <div>{action.description}</div>}
					</div>

					<div></div>
				</div>
			</PageHeader>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{action?.fields && <FormFields fields={action.fields} />}

							<Button type="submit" disabled={isPending}>
								{isPending ? "Executing..." : "Execute"}
							</Button>
						</form>
					</Form>
				</div>
			</PageBody>
		</Page>
	);
}
