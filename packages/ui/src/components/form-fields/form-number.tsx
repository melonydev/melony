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
import { NumberField } from "@melony/types";

export function FormNumber({ field }: { field: NumberField }) {
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
						<Input
							type="number"
							value={rhfField.value}
							onChange={(e) => {
								rhfField.onChange(e.target.valueAsNumber);
							}}
						/>
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
