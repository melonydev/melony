import { Page } from "@melony/ui";

export async function DefaultPage({ children }: { children: React.ReactNode }) {
	return <Page>{children}</Page>;

	// switch (params.slug.length) {
	// 	case 2: // view doc (/resource/doc)
	// 		return (
	// 			<Page>
	// 				<PageBody>
	// 					<SmartDetailsList
	// 						resource={resource}
	// 						docId={params.slug[1] || "unknown"}
	// 					/>
	// 				</PageBody>
	// 			</Page>
	// 		);
	// 	default: // view resource (/resource)
	// 		return (
	// 			<Page>
	// 				{/* <PageHeader title={resource?.title || resource.model} /> */}
	// 				<PageBody>
	// 					<SmartTable resource={resource} />
	// 				</PageBody>
	// 			</Page>
	// 		);
	// }
}

export function makePage() {
	return async function TablePage({ params }: { params: { slug: string } }) {
		// const modelName = params?.slug?.[0] || "";

		return (
			<Page>
				<></>
			</Page>
		);

		// switch (params.slug.length) {
		// 	case 2: // view doc (/resource/doc)
		// 		return (
		// 			<Page>
		// 				<PageBody>
		// 					<SmartDetailsList
		// 						resource={resource}
		// 						docId={params.slug[1] || "unknown"}
		// 					/>
		// 				</PageBody>
		// 			</Page>
		// 		);
		// 	default: // view resource (/resource)
		// 		return (
		// 			<Page>
		// 				{/* <PageHeader title={resource?.title || resource.model} /> */}
		// 				<PageBody>
		// 					<SmartTable resource={resource} />
		// 				</PageBody>
		// 			</Page>
		// 		);
		// }
	};
}
