import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { ColorPicker } from "../color-picker";
import { ColorField } from "@melony/types";

export function FormColor({ field }: { field: ColorField }) {
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
						<ColorPicker {...rhfField} />
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
