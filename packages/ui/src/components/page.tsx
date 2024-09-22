import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
	return (
		<div id="page" className="h-full flex flex-col rounded-md border shadow">
			{children}
		</div>
	);
}

export const PageHeader = ({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: JSX.Element | JSX.Element[];
}) => {
	return (
		<div className="h-[49px] py-1 px-4">
			<div className="h-full flex items-center justify-between">
				<div className="flex flex-col">
					<div className="font-semibold">{title}</div>
					{description && (
						<div className="text-xs opacity-60">{description}</div>
					)}
				</div>

				{actions && <div>{actions}</div>}
			</div>
		</div>
	);
};

export const PageBody = ({ children }: { children: React.ReactNode }) => {
	return <div className="relative overflow-auto h-full w-full">{children}</div>;
};
