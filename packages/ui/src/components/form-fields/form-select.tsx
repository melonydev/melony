import { SelectField } from "@melony/types";
import { FormControl } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { FormFieldProps } from "./types";

export function FormSelect({
	field,
	formFieldProps,
}: FormFieldProps & { field: SelectField }) {
	return (
		<FormControl>
			<Select onValueChange={formFieldProps.onChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select" />
				</SelectTrigger>
				<SelectContent>
					{field?.options?.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</FormControl>
	);
}
