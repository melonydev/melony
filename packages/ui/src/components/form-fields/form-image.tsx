import React from "react";
import { FormFieldProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpload } from "@/hooks";

const packFiles = (files: any) => {
	const data = new FormData();

	[...files].map((file, i) => {
		data.append(`files`, file, file.name);
	});

	return data;
};

export function FormImage({ field, formFieldProps }: FormFieldProps) {
	const { mutate, isPending, error } = useUpload();

	const inputRef = React.useRef<HTMLInputElement | null>(null);

	const hanldeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = packFiles(e.currentTarget.files);

		mutate(data, {
			onSuccess: (data: any) => {
				formFieldProps.onChange(data.files?.[0]?.downloadUrl);
			},
			onError: (err) => {
				console.log(err);
			},
		});
	};

	return (
		<div className="flex gap-4 items-center">
			<Avatar className="rounded-md w-12 h-12">
				<AvatarImage src={formFieldProps.value} />
				<AvatarFallback></AvatarFallback>
			</Avatar>
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
		</div>
	);
}
