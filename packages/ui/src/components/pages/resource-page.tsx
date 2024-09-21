import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { useApp } from "../providers/app-provider";
import { EmptyScreen } from "../empty-screen";

export function ResourcePage({
	resourceId,
	ctx,
}: {
	resourceId: string;
	ctx: any;
}) {
	const { navigate, config } = useApp();

	const resource = config?.resources?.[resourceId];

	const actions = resource?.actions || {};

	if (!resource) return null;

	return (
		<Page>
			<PageHeader
				title={resource?.title || resourceId}
				description={resource?.description}
			/>

			<PageBody>
				{Object.keys(actions).length === 0 && (
					<div className="container mx-auto max-w-5xl py-8">
						<EmptyScreen title="Resource has no actions" />
					</div>
				)}

				<div className="container mx-auto max-w-5xl py-8">
					<div className="flex flex-col gap-2">
						{Object.keys(actions).map((actionKey) => {
							const action = actions[actionKey];

							if (!action) return null;

							return (
								<div key={actionKey}>
									<Button
										variant="link"
										onClick={() => {
											navigate(`/${resourceId}/${actionKey}`);
										}}
									>
										{action?.title || actionKey}
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
