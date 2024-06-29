import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldProps } from "./types";

export function FormNumber({ field, formFieldProps }: FormFieldProps) {
	return (
		<FormControl>
			<Input
				placeholder={field.name}
				type="number"
				value={formFieldProps.value}
				onChange={(e) => {
					formFieldProps.onChange(e.target.valueAsNumber);
				}}
			/>
		</FormControl>
	);
}
