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

export function FormNumber({
	fieldKey,
	field,
}: {
	fieldKey: string;
	field: NumberField;
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
						<Input
							type="number"
							value={rhfField.value}
							onChange={(e) => {
								rhfField.onChange(e.target.valueAsNumber);
							}}
							disabled={field?.isReadOnly}
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
