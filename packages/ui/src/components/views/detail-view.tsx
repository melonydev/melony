import { BaseContext, DetailViewProps } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { useApp } from "../providers/app-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ViewRenderer } from "../view-renderer";
import { HeaderButtons } from "../actions/header-buttons";
import { cn } from "@/lib";
import { Card } from "../ui/card";

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
		queryFn: () => view?.action(ctx),
		enabled: !!id,
	});

	const fields = view?.fields || {};

	if (isLoading) return <>Loading...</>;

	if (!view) return null;

	if (!id) return <div className="p-4">ID required</div>;

	return (
		<Card className="h-full w-full bg-sidebar dark:bg-sidebar">
			<div className="flex flex-col h-full">
				{(view?.headerButtons || []).length > 0 && (
					<div className="p-2 flex items-center gap-2 justify-between border-b">
						<HeaderButtons viewId={viewId} ctx={ctx} />
					</div>
				)}

				<div className="grid grid-cols-12 flex-1">
					<div
						className={cn("col-span-3 bg-background/20 border-r", {
							"col-span-12": !view?.tabs,
						})}
					>
						<div className="flex flex-col rounded-md py-2 px-4">
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
										<div className="col-span-5">
											<div className="text-sm text-muted-foreground">
												{field?.label || fieldKey}
											</div>
										</div>

										<div className="text-sm col-span-7">
											<Comp field={field} value={value} />
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{view?.tabs && (
						<div className="col-span-9">
							<Tabs
								defaultValue={view.tabs[0]?.viewId}
								className="w-full h-full flex flex-col rounded-md"
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
										className="flex flex-1"
									>
										<ViewRenderer
											view={tabElement.viewId}
											ctx={{ ...ctx }}
											setContext={tabElement?.setContext}
										/>
									</TabsContent>
								))}
							</Tabs>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}
