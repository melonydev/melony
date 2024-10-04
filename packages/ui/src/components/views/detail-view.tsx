import { BaseContext, DetailViewProps } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { Label } from "../ui/label";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { useApp } from "../providers/app-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ViewRenderer } from "../view-renderer";
import { HeaderButtons } from "../actions/header-buttons";
import { cn } from "@/lib";

export function DetailView({
	viewId,
	ctx,
}: {
	viewId: string;
	ctx: BaseContext;
}) {
	const { config } = useApp();

	const id = ctx?.searchParams?.id;

	const view = config?.views?.[viewId] as DetailViewProps;

	const { data, isLoading } = useQuery({
		queryKey: [viewId, id],
		queryFn: () => view?.action({ id }),
		enabled: !!id,
	});

	const fields = view?.fields || {};

	if (isLoading) return <>Loading...</>;

	if (!view) return null;

	if (!id) return <div className="p-4">ID required</div>;

	return (
		<div className="p-4">
			<div className="flex flex-col gap-8">
				<HeaderButtons viewId={viewId} ctx={ctx} />

				<div className="grid grid-cols-12 gap-8">
					{view?.tabs && (
						<div className="col-span-8">
							<Tabs
								defaultValue={view.tabs[0]?.viewId}
								className="w-full rounded-md"
							>
								<TabsList>
									{view.tabs.map((tabElement) => (
										<TabsTrigger
											key={tabElement.viewId}
											value={tabElement.viewId}
										>
											{tabElement.label}
										</TabsTrigger>
									))}
								</TabsList>

								{view.tabs.map((tabElement) => (
									<TabsContent
										key={tabElement.viewId}
										value={tabElement.viewId}
									>
										<ViewRenderer
											viewId={tabElement.viewId}
											ctx={{ ...ctx }}
											setContext={tabElement?.setContext}
										/>
									</TabsContent>
								))}
							</Tabs>
						</div>
					)}

					<div className={cn("col-span-4", { "col-span-12": !view?.tabs })}>
						<div className="flex flex-col rounded-md px-4">
							{Object.keys(fields).map((fieldKey) => {
								const field = fields[fieldKey];

								if (!field) return null;

								if (field.type === "relationship" && field?.displayField) {
									fieldKey = field.displayField;
								}

								let Comp =
									field?.components?.form ||
									DEFAULT_COMPONENTS_MAP[field?.type || "text"].display;

								const value = data?.[fieldKey];

								return (
									<div
										key={fieldKey}
										className="grid grid-cols-12 items-center py-2"
									>
										<div className="col-span-4">
											<div className="text-sm text-muted-foreground">
												{field?.label || fieldKey}
											</div>
										</div>

										<div className="col-span-8">
											<Comp field={field} value={value} />
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
