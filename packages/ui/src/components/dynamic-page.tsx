import { Requires } from "./actions/requires";
import { FormPage } from "./pages/form-page";
import { DocPage } from "./pages/doc-page";
import { ListPage } from "./pages/list-page";
import { ResourcePage } from "./pages/resource-page";
import { HomePage } from "./pages/home-page";
import { useApp } from "./providers/app-provider";

export function DynamicPage(props: any) {
	const params = props?.params || {};
	const searchParams = props?.searchParams || {};

	const { config } = useApp();

	const resources = config?.resources || {};

	const pathArr = params?.path || [];

	const resourceId = pathArr?.[0];
	const actionId = pathArr?.[1];
	const docId = pathArr?.[2];

	const resource = resources[resourceId];
	const actions = resources[resourceId]?.actions || {};

	// show home page if no resourceId
	if (!resourceId) {
		return <HomePage resources={resources} ctx={{ searchParams }} />;
	}

	if (!resource) return <>Resource not found</>;

	const action = actions[actionId];

	// if resource found and no action was provided, show the resource main page
	if (!action)
		return <ResourcePage resourceId={resourceId} ctx={{ searchParams }} />;

	// render list, doc or form page
	if (actionId === "list") {
		return <ListPage resourceId={resourceId} ctx={{ searchParams }} />;
	}

	if (actionId === "read") {
		return (
			<Requires resourceId={resourceId} actionId={actionId} id={docId}>
				<DocPage resourceId={resourceId} id={docId} ctx={{ searchParams }} />
			</Requires>
		);
	}

	return (
		<Requires resourceId={resourceId} actionId={actionId} id={docId}>
			<FormPage
				resourceId={resourceId}
				actionId={actionId}
				id={docId}
				ctx={{ searchParams }}
			/>
		</Requires>
	);
}
