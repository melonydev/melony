import { stringToColor } from "@/lib/string-to-color";
import { useApp } from "./providers/app-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProjectPopover({ title }: { title: string }) {
	const { navigate } = useApp();

	return (
		<div
			className="flex flex-1 items-center cursor-pointer hover:bg-muted rounded-md px-2 py-1"
			onClick={() => {
				navigate("/");
			}}
		>
			<Avatar className="h-7 w-7 mr-2 rounded">
				<AvatarImage />
				<AvatarFallback className="rounded">
					<div
						className="absolute opacity-40 inset-0"
						style={{
							backgroundColor: stringToColor(title),
						}}
					></div>
					<span className="text-xs font-semibold">
						{title.slice(0, 1).toUpperCase()}
					</span>
				</AvatarFallback>
			</Avatar>

			<div className="text-left">
				<div className="font-semibold">{title}</div>
			</div>
		</div>
	);
}
