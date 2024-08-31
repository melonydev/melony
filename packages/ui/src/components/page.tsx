import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
	return (
		<div id="page" className="h-full flex flex-col rounded-md border shadow">
			{children}
		</div>
	);
}

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
	return <div className="py-1 px-4 border-b h-[49px]">{children}</div>;
};

export const PageBody = ({ children }: { children: React.ReactNode }) => {
	return <div className="relative overflow-auto h-full w-full">{children}</div>;
};
