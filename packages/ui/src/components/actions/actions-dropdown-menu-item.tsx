import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Action } from "@melony/types";

export function ActionsDropdownMenuItem({
	action,
	onClick,
}: {
	action: Action;
	onClick: () => void;
}) {
	return (
		<DropdownMenuItem
			key={action.id}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			<span>{action?.title || action.id}</span>
		</DropdownMenuItem>
	);
}
