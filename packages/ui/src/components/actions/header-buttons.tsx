import { Button } from "@/components/ui/button";
import { useApp } from "../providers/app-provider";
import { BaseContext, ListViewProps } from "@melony/types";

export function HeaderButtons({
	viewId,
	ctx,
}: {
	viewId: string;
	ctx?: BaseContext;
}) {
	const { navigate, config } = useApp();

	const id = ctx?.searchParams?.id;

	const view = config?.views?.[viewId] as ListViewProps;
	const headerButtons = view?.headerButtons || [];

	if (headerButtons.length === 0) return null;

	return (
		<div className="flex items-center gap-1">
			{headerButtons.map((buttonElement) => {
				return (
					<Button
						key={buttonElement.viewId}
						onClick={() => {
							navigate(`/${buttonElement.viewId}${id ? `?id=${id}` : ``}`);
						}}
						variant={"secondary"}
					>
						{buttonElement.label}
					</Button>
				);
			})}
		</div>
	);
}
