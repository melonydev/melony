import { DisplayFieldProps } from "./types";

export const DisplayText = ({ value }: DisplayFieldProps) => {
	return (
		<span className="block truncate max-w-[200px]">
			{typeof value === "object" ? JSON.stringify(value) : value}
		</span>
	);
};
