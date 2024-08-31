import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { RichTextField } from "@melony/types";

export function FormRichText({ field }: { field: RichTextField }) {
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
						<Textarea {...rhfField} />
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
