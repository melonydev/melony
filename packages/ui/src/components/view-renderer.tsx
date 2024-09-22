import { FormView } from "./views/form-view";
import { DetailView } from "./views/detail-view";
import { ListView } from "./views/list-view";
import { useApp } from "./providers/app-provider";
import { EmptyView } from "./views/empty-view";
import { BaseContext, ContextUpdater } from "@melony/types";
import { useQuery } from "@tanstack/react-query";

export function ViewRenderer({
	viewId,
	ctx,
	setContext,
}: {
	viewId: string;
	ctx: BaseContext;
	setContext?: ContextUpdater;
}) {
	const { config } = useApp();

	const views = config?.views || {};
	const view = views[viewId];

	const { data: nextContext = {}, isLoading } = useQuery({
		queryKey: [viewId, "setContext", viewId, ctx],
		queryFn: () => setContext && setContext({ ...ctx }),
		enabled: !!setContext,
	});

	if (isLoading) return <>Loading...</>;

	if (!view) return <EmptyView title="View not found" />;

	// render list, doc or form page
	if (view.type === "list") {
		return <ListView viewId={viewId} ctx={{ ...ctx, ...nextContext }} />;
	}

	if (view.type === "detail") {
		return <DetailView viewId={viewId} ctx={{ ...ctx, ...nextContext }} />;
	}

	return <FormView viewId={viewId} ctx={{ ...ctx, ...nextContext }} />;
}
