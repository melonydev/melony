import { HomeView } from "./views/home-view";
import { useApp } from "./providers/app-provider";
import { Page, PageBody, PageHeader } from "./page";
import { ViewRenderer } from "./view-renderer";

export function DynamicPage(props: any) {
	const params = props?.params || {};
	const searchParams = props?.searchParams || {};

	const { config } = useApp();

	const views = config?.views || {};

	const pathArr = params?.path || [];

	const viewId = pathArr?.[0];

	const view = views[viewId];

	if (!viewId) {
		return (
			<Page>
				<PageHeader title={"Home"} />

				<PageBody>
					<HomeView views={views} ctx={{ searchParams }} />
				</PageBody>
			</Page>
		);
	}

	return (
		<Page>
			<PageHeader
				title={`${view?.title || viewId}`}
				description={view?.description}
			/>

			<PageBody>
				<ViewRenderer viewId={viewId} ctx={{ searchParams }} />
			</PageBody>
		</Page>
	);
}
