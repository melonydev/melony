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
					<div className="grid grid-cols-12">
						<div className="col-span-4">
							<FormLabel>{field?.label || fieldKey}</FormLabel>
						</div>

						<div className="col-span-8">
							<FormControl>
								<div className="flex flex-col gap-1">
									<Input
										type="number"
										value={rhfField.value}
										onChange={(e) => {
											rhfField.onChange(e.target.valueAsNumber);
										}}
										disabled={field?.isReadOnly}
									/>

									{field?.description && (
										<FormDescription>{field?.description}</FormDescription>
									)}
									<FormMessage />
								</div>
							</FormControl>
						</div>
					</div>
				</FormItem>
			)}
		/>
	);
}
