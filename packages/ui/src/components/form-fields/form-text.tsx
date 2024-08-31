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

export function FormText({ field }: { field: TextField }) {
	const { control } = useFormContext();

	return (
		<FormField
			key={field.key}
			control={control}
			name={field.key}
			render={({ field: rhfField }) => (
				<FormItem>
					<FormLabel>{field?.label || field.key}</FormLabel>
					<FormControl>
						<Input {...rhfField} />
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
