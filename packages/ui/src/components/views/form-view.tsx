import { BaseContext, FormViewProps } from "@melony/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { FormFields } from "../form-fields";
import { useApp } from "../providers/app-provider";
import { Card } from "../ui/card";

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

	const view = config?.views?.[viewId] as FormViewProps;

	const { data: getDefaultValues, isLoading } = useQuery({
		queryKey: [viewId, "getDefaultValues", id],
		queryFn: () => view?.getDefaultValues && view?.getDefaultValues(ctx),
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
				onSuccess: (res) => {
					if (res?.message) {
						toast({
							title: res.message,
						});
					}

					if (res?.url) {
						window.open(res.url);
					}
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
		<Card className="h-full w-full bg-sidebar dark:bg-sidebar">
			<div className="p-8">
				<div className="grid grid-cols-12">
					<div className="col-span-8">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormFields fields={fields} />

								<div className="py-4" />

								<Button type="submit" disabled={isPending}>
									{isPending ? "Executing..." : "Execute"}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</Card>
	);
}
