import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { TextField } from "@melony/types";

export function FormText({
	fieldKey,
	field,
}: {
	fieldKey: string;
	field: TextField;
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
						<Input {...rhfField} disabled={field?.isReadOnly} />
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
