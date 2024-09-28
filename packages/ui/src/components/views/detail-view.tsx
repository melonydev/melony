import { BaseContext, DetailView as DetailViewTD } from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { Label } from "../ui/label";
import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { useApp } from "../providers/app-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ViewRenderer } from "../view-renderer";
import { HeaderButtons } from "../actions/header-buttons";

export function DetailView({
	viewId,
	ctx,
}: {
	viewId: string;
	ctx: BaseContext;
}) {
	const { config } = useApp();

	const id = ctx?.searchParams?.id;

	const view = config?.views?.[viewId] as DetailViewTD;

	const { data, isLoading } = useQuery({
		queryKey: [viewId, id],
		queryFn: () => view?.action({ id }),
		enabled: !!id,
	});

	const fields = view?.fields || {};

	if (isLoading) return <>Loading...</>;

	if (!view) return null;

	if (!id) return <>ID required</>;

	return (
		<div className="p-8">
			<div className="flex flex-col gap-8">
				<HeaderButtons viewId={viewId} ctx={ctx} />

				<div className="flex flex-col divide-y border rounded-md px-4">
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
								<div className="col-span-3">
									<Label>{field?.label || fieldKey}</Label>
								</div>

								<div className="col-span-9">
									<Comp field={field} value={value} />
								</div>
							</div>
						);
					})}
				</div>

				{view?.tabs && (
					<Tabs
						defaultValue={view.tabs[0]?.viewId}
						className="w-full rounded-md border"
					>
						<TabsList>
							{view.tabs.map((tabElement) => (
								<TabsTrigger key={tabElement.viewId} value={tabElement.viewId}>
									{tabElement.label}
								</TabsTrigger>
							))}
						</TabsList>

						{view.tabs.map((tabElement) => (
							<TabsContent key={tabElement.viewId} value={tabElement.viewId}>
								<ViewRenderer
									viewId={tabElement.viewId}
									ctx={{ ...ctx }}
									setContext={tabElement?.setContext}
								/>
							</TabsContent>
						))}
					</Tabs>
				)}
			</div>
		</div>
	);
}
