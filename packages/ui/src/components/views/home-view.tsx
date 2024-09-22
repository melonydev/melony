import { Button } from "../ui/button";
import { useApp } from "../providers/app-provider";
import { EmptyScreen } from "../empty-screen";
import { View } from "@melony/types";

export function HomeView({
	views = {},
	ctx,
}: {
	views?: Record<string, View>;
	ctx: any;
}) {
	const { navigate } = useApp();

	return (
		<>
			{Object.keys(views).length === 0 && (
				<div className="container mx-auto max-w-5xl py-8">
					<EmptyScreen title="Project has no views" />
				</div>
			)}
			<div className="container mx-auto max-w-5xl py-8">
				<div className="flex flex-col gap-2">
					{Object.keys(views).map((viewId) => {
						const view = views[viewId];

						if (!view) return null;

						return (
							<div key={viewId}>
								<Button
									variant="link"
									onClick={() => {
										navigate(`/${viewId}`);
									}}
								>
									{view?.title || viewId}
								</Button>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
