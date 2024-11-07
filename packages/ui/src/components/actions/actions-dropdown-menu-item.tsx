import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ActionsDropdownMenuItem({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) {
	return (
		<DropdownMenuItem
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			<span>{label}</span>
		</DropdownMenuItem>
	);
}
