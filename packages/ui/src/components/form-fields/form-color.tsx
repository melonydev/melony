import { ColorPicker } from "../color-picker";
import { FormControl } from "../ui/form";
import { FormFieldProps } from "./types";

export function FormColor({ field, formFieldProps }: FormFieldProps) {
	return (
		<FormControl>
			<ColorPicker {...formFieldProps} />
		</FormControl>
	);
}
