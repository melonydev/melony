import { DisplayFieldProps } from "./types";

export const DisplayRichText = ({ defaultValue }: DisplayFieldProps) => {
	return (
		<span className="block truncate max-w-[200px]">
			{typeof defaultValue === "object"
				? JSON.stringify(defaultValue)
				: defaultValue}
		</span>
	);
};
