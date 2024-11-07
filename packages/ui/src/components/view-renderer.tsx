import { FormView } from "./views/form-view";
import { DetailView } from "./views/detail-view";
import { ListView } from "./views/list-view";
import { useApp } from "./providers/app-provider";
import { EmptyView } from "./views/empty-view";
import {
	BaseContext,
	ContextUpdater,
	ListViewProps,
	View,
} from "@melony/types";
import { useQuery } from "@tanstack/react-query";
import { ChatView } from "./views/chat-view";

export function ViewRenderer({
	view: viewOrId,
	ctx,
	setContext,
}: {
	view: string | View;
	ctx: BaseContext;
	setContext?: ContextUpdater;
}) {
	const { config } = useApp();

	const views = config?.views || {};

	const viewId = typeof viewOrId === "string" ? viewOrId : "unknownViewId";
	const view = typeof viewOrId === "object" ? viewOrId : views[viewId];

	const { data: nextContext = {}, isLoading } = useQuery({
		queryKey: [viewId, "setContext", viewId, ctx],
		queryFn: () => setContext && setContext({ ...ctx }),
		enabled: !!setContext,
	});

	if (isLoading) return <>Loading...</>;

	if (!view) return <EmptyView title="View not found" />;

	if (view.type === "list") {
		return (
			<ListView
				view={viewOrId as string | ListViewProps}
				ctx={{ ...ctx, ...nextContext }}
			/>
		);
	}

	if (view.type === "detail") {
		return (
			<DetailView
				viewId={viewOrId as string}
				ctx={{ ...ctx, ...nextContext }}
			/>
		);
	}

	if (view.type === "chat") {
		return (
			<ChatView viewId={viewOrId as string} ctx={{ ...ctx, ...nextContext }} />
		);
	}

	if (view.type === "form") {
		return (
			<FormView viewId={viewOrId as string} ctx={{ ...ctx, ...nextContext }} />
		);
	}

	return <div>Wrong view type.</div>;
}
