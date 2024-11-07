import { DisplayFieldProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const DisplayImage = ({ field, value }: DisplayFieldProps) => {
	return (
		<Avatar className="h-8 w-8">
			<AvatarImage src={value} alt={field.key} />
			<AvatarFallback></AvatarFallback>
		</Avatar>
	);
};
