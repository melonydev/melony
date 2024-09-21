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
import { PasswordField } from "@melony/types";

export function FormPassword({
	fieldKey,
	field,
}: {
	fieldKey: string;
	field: PasswordField;
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
						<Input type="password" {...rhfField} />
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
