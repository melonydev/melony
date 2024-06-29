"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Field } from "@melony/types";
import { getFieldValidation } from "@/lib/validation";

type ActionBackedFormProps = {
	fields: Field[];
};

export function ActionBackedForm({ fields }: ActionBackedFormProps) {
	const schemaFields = fields.map((field) => {
		return [field.name, getFieldValidation(field)];
	});

	const formSchema = z.object(Object.fromEntries(schemaFields));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				{fields.map((field) => {
					return (
						<FormField
							key={field.name}
							control={form.control}
							name={field.name}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{field.name}</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
