import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib";

const badgeVariants = cva(
	"max-w-[200px] relative inline-flex truncate items-center rounded-md text-xs border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
	color?: string;
}

function Badge({ className, variant, color, children, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant }), className, {
				"border-none": !!color,
			})}
			{...props}
		>
			{color && (
				<div
					className="absolute opacity-25 top-0 right-0 bottom-0 left-0"
					style={{ backgroundColor: color }}
				/>
			)}

			<span className="relative block truncate">{children}</span>
		</div>
	);
}

export { Badge, badgeVariants };
