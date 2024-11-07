import React from "react";
import { cn } from "../lib";

export type ColorPickerProps = {
	value?: string;
	onChange: (color: string) => void;
};

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
	const colors = [
		"#eab308",
		"#ef4444",
		"#0ea5e9",
		"#6366f1",
		"#84cc16",
		"#f97316",
		"#d946ef",
		"#ec4899",
	];

	return (
		<div className="relative flex gap-2">
			{colors.map((color, idx) => (
				<div
					key={idx}
					className={cn("rounded-full bg-neutral/20 h-8 w-8 cursor-pointer", {
						"ring-4": value === color,
					})}
					style={{ backgroundColor: color }}
					onClick={() => {
						onChange(color);
					}}
				/>
			))}
		</div>
	);
};
