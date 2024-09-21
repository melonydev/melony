import { useMutation } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { FormFields } from "../form-fields";
import { useApp } from "../providers/app-provider";
import { Action, Resource } from "@melony/types";

export function IdActionPage({
	resource,
	action,
}: {
	resource: Resource;
	action: Action;
}) {
	const { navigate } = useApp();
	const { toast } = useToast();

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: ["idAction"],
		mutationFn: async ({ data: { id } }) => {
			navigate(`/${resource.id}/${action.id}/${id}`);
		},
	});

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		values: {
			id: "",
		},
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
			<PageHeader
				title={`${resource?.title || resource.id} • ${action?.title || action.id}`}
				description={action?.description}
			/>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormFields fields={[{ key: "id", label: "ID" }]} />

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
