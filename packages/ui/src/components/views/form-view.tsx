import { BaseContext, FormView as FormViewTD } from "@melony/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { FormFields } from "../form-fields";
import { useApp } from "../providers/app-provider";

export function FormView({
	viewId,
	ctx,
}: {
	viewId: string;
	ctx: BaseContext;
}) {
	const { toast } = useToast();
	const { config } = useApp();

	const id = ctx?.searchParams?.id;

	const view = config?.views?.[viewId] as FormViewTD;

	const { data: getDefaultValues, isLoading } = useQuery({
		queryKey: [viewId, "getDefaultValues", id],
		queryFn: () => view?.getDefaultValues && view?.getDefaultValues({ id }),
		enabled: !!view?.getDefaultValues && !!id,
	});

	const { mutate, isPending } = useMutation<any, any, any>({
		mutationKey: [viewId],
		mutationFn: view?.action,
	});

	const form = useForm<any>({
		// resolver: zodResolver(formSchema),
		values: { ...getDefaultValues },
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

	if (isLoading) return <>Loading doc...</>;

	const fields = view?.fields || {};

	return (
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
	);
}
