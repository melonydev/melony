import z from "zod";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Field, Resource } from "@melony/types";
import { getFieldValidation } from "@/lib/validation";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { DEFAULT_FIELD_UI_COMPONENTS } from "./default-field-ui-components";
import { useApp } from "../providers/app-provider";

const sanitizeFormFields = (fields: Field[]) => {
	const newFields: Field[] = [];

	fields.map((field) => {
		const fieldName =
			field.type === "relationship"
				? field.relationFromFields?.[0] || "unknownField"
				: field.name;

		// replace relationship field names with scalar ones
		newFields.push({ ...field, name: fieldName });
	});

	// omit one to many relations from the form
	return newFields.filter((f) => !f.isList);
};

const normalizeFormFields = (values: any, fields: Field[]) => {
	const newValues: any = {};

	Object.keys(values).map((fieldName) => {
		const field = fields.find((x) => x.name === fieldName);
		let value = values?.[fieldName];

		if (field?.type === "number") {
			value = Number(value);
		}

		newValues[fieldName] = value;
	});

	return newValues;
};

export function SmartForm({
	resource,
	values,
	onSubmit,
	onCancel,
	isSubmitting,
}: {
	resource: Resource;
	onSubmit: (data: any) => void;
	onCancel?: () => void;
	values?: any;
	isSubmitting?: boolean;
}) {
	const { models } = useApp();

	// retrieve only fields provided in resource
	const resourceFields = sanitizeFormFields(resource.fields);

	const correspondingModel = models.find((m) => m.name === resource.model);
	// retrieve all the fields
	const modelFields = correspondingModel?.fields || [];

	const schemaFields = resourceFields.map((field) => {
		return [field.name, getFieldValidation(field)];
	});

	const formSchema = z.object(Object.fromEntries(schemaFields));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values,
	});

	const handleSubmit = (inputData: any) => {
		// include ID to perform crud operation
		onSubmit(
			normalizeFormFields({ ...inputData, id: values?.id }, modelFields),
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit, (err) => console.log(err))}
				className="space-y-4"
			>
				<FormFields fields={resourceFields} />

				<div className="flex gap-2 justify-end">
					{onCancel && (
						<Button variant="ghost" onClick={onCancel}>
							Cancel
						</Button>
					)}

					<Button type="submit" disabled={isSubmitting}>
						<Check className="h-4 w-4 mr-2" />
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}

export function FormFields({ fields }: { fields: Field[] }) {
	const { control } = useFormContext();

	return (
		<div className="flex flex-col gap-4">
			{fields.map((field) => {
				let Comp =
					field?.components?.form ||
					DEFAULT_FIELD_UI_COMPONENTS[field?.type || "text"].form;

				return (
					<FormField
						key={field.name}
						control={control}
						name={field.name}
						render={({ field: formFieldProps }) => {
							return (
								<FormItem>
									<div className="flex flex-col gap-1">
										<div>
											<FormLabel>{field.name}</FormLabel>
										</div>
										<div>
											<Comp formFieldProps={formFieldProps} field={field} />

											<FormMessage />
										</div>
									</div>
								</FormItem>
							);
						}}
					/>
				);
			})}
		</div>
	);
}
