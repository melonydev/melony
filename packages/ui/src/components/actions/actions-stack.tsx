import { Button } from "@/components/ui/button";
import { Action } from "@melony/types";
import { useApp } from "../providers/app-provider";

export function ActionsStack({ resourceId }: { resourceId: string }) {
	const { navigate, config } = useApp();

	const resource = config?.resources?.[resourceId];
	const actions = resource?.actions || {};

	const filteredActions = Object.entries(actions).reduce<
		Record<string, Action>
	>((acc, [key, value]) => {
		if (
			value &&
			!value?.isDocRequired &&
			value?.type !== "list" &&
			value?.type !== "doc"
		) {
			acc[key] = value;
		}
		return acc;
	}, {});

	return (
		<div className="flex items-center gap-1">
			{Object.keys(filteredActions).map((actionKey) => {
				const action = actions[actionKey];

				if (!action) return null;

				return (
					<Button
						key={actionKey}
						onClick={() => {
							navigate(`/${resourceId}/create`);
						}}
						variant={"outline"}
					>
						{action?.title || actionKey}
					</Button>
				);
			})}
		</div>
	);
}
