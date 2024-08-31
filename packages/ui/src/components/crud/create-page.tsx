import { Resource } from "@melony/types";
import { useMutation } from "@tanstack/react-query";
import { useApp } from "../providers/app-provider";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { CheckIcon } from "lucide-react";
import { FormFields } from "../form-fields";

export function Create({ resource, ctx }: { resource: Resource; ctx: any }) {
	const { toast } = useToast();
	const { navigate } = useApp();

	const resourceCreateAction = (resource?.actions || []).find(
		(x) => x.type === "create",
	);

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: [resource.id],
		mutationFn: resourceCreateAction?.handler,
	});

	// Define default values for each field
	const defaultValues = (resource.fields || []).reduce((acc, field) => {
		return {
			...acc,
			[field.key]: field?.default || "",
		};
	}, {});

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		defaultValues,
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
							{resource?.title || resource.id} • Create
						</div>
						{resource?.description && <div>{resource.description}</div>}
					</div>

					<div></div>
				</div>
			</PageHeader>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormFields fields={resource.fields || []} />

							<Button type="submit" disabled={isPending}>
								<CheckIcon className="h-4 w-4 mr-2" />
								{isPending ? "Creating..." : "Create"}
							</Button>
						</form>
					</Form>
				</div>
			</PageBody>
		</Page>
	);
}
