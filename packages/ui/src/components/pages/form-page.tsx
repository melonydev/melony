import { ID } from "@melony/types";
import { useMutation } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { FormFields } from "../form-fields";
import { useDoc } from "../actions/doc-provider";
import { useApp } from "../providers/app-provider";

export function FormPage({
	resourceId,
	actionId,
	id,
	ctx,
}: {
	resourceId: string;
	actionId: string;
	id?: ID;
	ctx: any;
}) {
	const { toast } = useToast();
	const { config } = useApp();

	const resource = config?.resources?.[resourceId];
	const action = config?.resources?.[resourceId]?.actions?.[actionId];

	const { doc, isLoading } = useDoc();

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: [resourceId, actionId],
		mutationFn: action?.execute,
	});

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		values: { ...doc, id },
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

	if (isLoading) return <>Loading doc...</>;

	const fields = action?.fields || {};

	return (
		<Page>
			<PageHeader
				title={`${resource?.title || resourceId} • ${action?.title || actionId} ${id && ` • ${id}`}`}
				description={action?.description}
			/>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormFields fields={fields} />

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
