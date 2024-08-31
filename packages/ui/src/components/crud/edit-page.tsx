import { ID, Resource } from "@melony/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApp } from "../providers/app-provider";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { FormFields } from "../form-fields";

export function Edit({
	resource,
	id,
	ctx,
}: {
	resource: Resource;
	id: ID;
	ctx: any;
}) {
	const { toast } = useToast();
	const { navigate } = useApp();

	const resourceGetOneAction = (resource?.actions || []).find(
		(x) => x.type === "getOne",
	);

	const { data, isLoading } = useQuery({
		queryKey: [resource.id, id],
		queryFn: () => resourceGetOneAction?.handler({ id }),
	});

	const resourceUpdateAction = (resource?.actions || []).find(
		(x) => x.type === "update",
	);

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: [resource.id],
		mutationFn: resourceUpdateAction?.handler,
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

	if (isLoading) return <>Loading...</>;

	return (
		<Page>
			<PageHeader>
				<div className="h-full flex items-center justify-between">
					<div className="flex flex-col">
						<div className="font-semibold">
							{resource?.title || resource.id} • Edit
						</div>
						{resource?.description && <div>{resource.description}</div>}
					</div>

					<div></div>
				</div>
			</PageHeader>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormFields fields={resource.fields || []} />

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
