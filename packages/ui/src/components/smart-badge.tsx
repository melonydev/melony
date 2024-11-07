import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export const SmartBadge = ({
	title,
	color,
	image,
}: {
	title: string;
	image?: string;
	color?: string;
}) => {
	return (
		<div className="min-w-[0] flex items-center gap-2">
			{image && (
				<Avatar className="w-6 h-6">
					<AvatarImage src={image} />
				</Avatar>
			)}

			<div>
				<div className="flex items-center">
					{color && (
						<div
							className="w-3 h-3 rounded-full mr-2"
							style={{ backgroundColor: color }}
						/>
					)}
					<span className="block truncate">{title}</span>
				</div>
			</div>
		</div>
	);
};
