import { Resource } from "@melony/types";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { useApp } from "../providers/app-provider";
import { EmptyScreen } from "../empty-screen";

export function HomePage({
	resources = {},
	ctx,
}: {
	resources?: Record<string, Resource>;
	ctx: any;
}) {
	const { navigate } = useApp();

	return (
		<Page>
			<PageHeader title={`Home`} />

			<PageBody>
				{Object.keys(resources).length === 0 && (
					<div className="container mx-auto max-w-5xl py-8">
						<EmptyScreen title="Project has no resources" />
					</div>
				)}

				<div className="container mx-auto max-w-5xl py-8">
					<div className="flex flex-col gap-2">
						{Object.keys(resources).map((resourcekey) => {
							const resource = resources[resourcekey];

							if (!resource) return null;

							return (
								<div key={resourcekey}>
									<Button
										variant="link"
										onClick={() => {
											navigate(`/${resourcekey}`);
										}}
									>
										{resource?.title || resourcekey}
									</Button>
								</div>
							);
						})}
					</div>
				</div>
			</PageBody>
		</Page>
	);
}
