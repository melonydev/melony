import { FormControl } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { FormFieldProps } from "./types";

export function FormRichText({ field, formFieldProps }: FormFieldProps) {
	return (
		<FormControl>
			<Textarea placeholder={field.name} {...formFieldProps} />
		</FormControl>
	);
}
