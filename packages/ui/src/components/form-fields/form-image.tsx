import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageField } from "@melony/types";

const packFiles = (files: any) => {
	const data = new FormData();

	[...files].map((file, i) => {
		data.append(`files`, file, file.name);
	});

	return data;
};

export function FormImage({ field }: { field: ImageField }) {
	const mutate = (data: any, options: any) => {};
	const isPending = false;

	const inputRef = React.useRef<HTMLInputElement | null>(null);

	const hanldeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = packFiles(e.currentTarget.files);

		mutate(data, {
			onSuccess: (data: any) => {
				// formFieldProps.onChange(data.files?.[0]?.downloadUrl);
			},
			onError: (err: any) => {
				console.log(err);
			},
		});
	};

	return (
		<div className="flex gap-4 items-center">
			<Avatar className="rounded-md w-12 h-12">
				<AvatarImage />
				<AvatarFallback></AvatarFallback>
			</Avatar>
			<FormItem>
				<FormLabel>{field?.label || field.key}</FormLabel>
				<FormControl>
					<div>
						<Input
							ref={inputRef}
							type="file"
							onChange={hanldeUpload}
							className="hidden"
						/>
						<Button
							type="button"
							size="sm"
							variant="secondary"
							disabled={isPending}
							onClick={() => {
								inputRef.current && inputRef.current.click();
							}}
						>
							{isPending ? "Uploading..." : "Upload"}
						</Button>
					</div>
				</FormControl>
				{field?.description && (
					<FormDescription>{field?.description}</FormDescription>
				)}
				<FormMessage />
			</FormItem>
		</div>
	);
}
