import { HomeView } from "./views/home-view";
import { useApp } from "./providers/app-provider";
import { Page, PageBody, PageHeader } from "./page";
import { HeaderButtons } from "./actions/header-buttons";
import { ViewRenderer } from "./view-renderer";

export function DynamicPage(props: any) {
	const params = props?.params || {};
	const searchParams = props?.searchParams || {};

	const { config } = useApp();

	const views = config?.views || {};

	const pathArr = params?.path || [];

	const viewId = pathArr?.[0];

	const view = views[viewId];

	const renderView = () => {
		// show home page if no resourceId
		if (!viewId) {
			return <HomeView views={views} ctx={{ searchParams }} />;
		}

		return <ViewRenderer viewId={viewId} ctx={{ searchParams }} />;
	};

	return (
		<Page>
			<PageHeader
				title={`${view?.title || viewId} • List`}
				description={view?.description}
				actions={<HeaderButtons viewId={viewId} />}
			/>

			<PageBody>{renderView()}</PageBody>
		</Page>
	);
}
