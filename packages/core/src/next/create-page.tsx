import { AppConfig } from "@melony/types";
import {
	ActionPage,
	Create,
	Edit,
	List,
	Page,
	ResourcePage,
	Show,
} from "@melony/ui";

export function createPage({ resources = [], auth }: AppConfig) {
	return async function DynamicPage(props: any) {
		const params = props?.params || {};
		const searchParams = props?.searchParams || {};

		const pathArr = params?.path || [];

		const resourceId = pathArr?.[0];
		const actionId = pathArr?.[1];
		const docId = pathArr?.[2];

		const resource = resources.find((x) => x.id === resourceId);

		if (!resource) return <>Resource not found</>;

		const action = (resource?.actions || []).find((x) => x.id === actionId);

		// if resource found and no action was provided, show the resource main page
		if (!action)
			return <ResourcePage resource={resource} ctx={{ searchParams }} />;

		if (actionId === "list") {
			return (
				<Page>
					<List resource={resource} ctx={{ searchParams }} />
				</Page>
			);
		}

		if (actionId === "show") {
			return (
				<Page>
					<Show resource={resource} id={docId} ctx={{ searchParams }} />
				</Page>
			);
		}

		if (actionId === "show") {
			return (
				<Page>
					<Show resource={resource} id={docId} ctx={{ searchParams }} />
				</Page>
			);
		}

		if (actionId === "create") {
			return (
				<Page>
					<Create resource={resource} ctx={{ searchParams }} />
				</Page>
			);
		}

		if (actionId === "edit") {
			return (
				<Page>
					<Edit resource={resource} id={docId} ctx={{ searchParams }} />
				</Page>
			);
		}

		return (
			<Page>
				<ActionPage
					resource={resource}
					action={action}
					id={docId}
					ctx={{ searchParams }}
				/>
			</Page>
		);

		// switch (pathArr.length) {
		// 	case 3:
		// 		if (!resource) return <>Resource not found</>;

		// 		return (
		// 			<Page>
		// 				<Edit
		// 					resource={resource}
		// 					id={pathArr?.[2] || ""}
		// 					ctx={{ searchParams }}
		// 				/>
		// 			</Page>
		// 		);

		// 	case 2:
		// 		// reserved path
		// 		if (pathArr?.[0] === "auth") {
		// 			const authAction = (auth?.actions || []).find(
		// 				(x) => x.id === pathArr?.[1],
		// 			);

		// 			if (authAction)
		// 				return (
		// 					<Page>
		// 						<ActionPage action={authAction} />
		// 					</Page>
		// 				);

		// 			return <>Auth action not found</>;
		// 		}

		// 		switch (pathArr?.[1]) {
		// 			case "create":
		// 				if (!resource) return <>Resource not found</>;

		// 				return (
		// 					<Page>
		// 						<Create resource={resource} ctx={{ searchParams }} />
		// 					</Page>
		// 				);

		// 			default:
		// 				if (!resource) return <>Resource not found</>;

		// 				return (
		// 					<Page>
		// 						<Show
		// 							resource={resource}
		// 							id={pathArr?.[1] || ""}
		// 							ctx={{ searchParams }}
		// 						/>
		// 					</Page>
		// 				);
		// 		}

		// 	default:
		// 		if (!resource) return <>Resource not found</>;

		// 		return (
		// 			<Page>
		// 				<List resource={resource} ctx={{ searchParams }} />
		// 			</Page>
		// 		);
		// }
	};
}
