import { Resource } from "@melony/types";
import { Button } from "../ui/button";
import { Page, PageBody, PageHeader } from "../page";
import { useApp } from "../providers/app-provider";

export function ResourcePage({
	resource,
	ctx,
}: {
	resource: Resource;
	ctx: any;
}) {
	const { navigate } = useApp();

	return (
		<Page>
			<PageHeader>
				<div className="h-full flex items-center justify-between">
					<div className="flex flex-col">
						<div className="font-semibold">
							{resource?.title || resource.id}
						</div>
						{resource?.description && <div>{resource.description}</div>}
					</div>

					<div></div>
				</div>
			</PageHeader>

			<PageBody>
				<div className="container mx-auto max-w-5xl py-8">
					<div className="flex flex-col gap-2">
						{(resource?.actions || []).map((action) => {
							return (
								<div key={action.id}>
									<Button
										variant="link"
										onClick={() => {
											navigate(`/${resource.id}/${action.id}`);
										}}
									>
										{action?.title || action.id}
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
