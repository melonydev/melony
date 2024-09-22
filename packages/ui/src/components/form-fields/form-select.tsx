import { SelectField } from "@melony/types";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useFormContext } from "react-hook-form";

export function FormSelect({
	fieldKey,
	field,
}: {
	fieldKey: string;
	field: SelectField;
}) {
	const { control } = useFormContext();

	return (
		<FormField
			key={fieldKey}
			control={control}
			name={fieldKey}
			render={({ field: rhfField }) => (
				<FormItem>
					<FormLabel>{field?.label || fieldKey}</FormLabel>
					<FormControl>
						<Select value={rhfField.value} onValueChange={rhfField.onChange}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								{field.options?.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					{field?.description && (
						<FormDescription>{field?.description}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
