import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Combobox } from "../ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { RelationshipField } from "@melony/types";

export function FormCombobox({
	fieldKey,
	field,
	simple,
}: {
	fieldKey: string;
	field: RelationshipField;
	simple?: boolean;
}) {
	const { control } = useFormContext();

	const { data = [], isLoading } = useQuery({
		queryKey: [`suggestions-${fieldKey}`],
		queryFn: () =>
			field?.getSuggestions
				? field.getSuggestions({ q: "" })
				: Promise.resolve([]),
	});

	return (
		<FormField
			key={fieldKey}
			control={control}
			name={fieldKey}
			render={({ field: rhfField }) => (
				<FormItem>
					<div className="grid grid-cols-12">
						{!simple && (
							<div className="col-span-4">
								<FormLabel>{field?.label || fieldKey}</FormLabel>
							</div>
						)}

						<div className="col-span-8">
							<FormControl>
								<Combobox
									options={data}
									value={`${rhfField.value}`} // make it always string
									onChange={(val) => {
										rhfField.onChange(
											field?.valueAsNumber ? parseInt(val) : val,
										);
									}}
									isLoading={isLoading}
								/>
							</FormControl>
							{field?.description && (
								<FormDescription>{field?.description}</FormDescription>
							)}
							<FormMessage />
						</div>
					</div>
				</FormItem>
			)}
		/>
	);
}
