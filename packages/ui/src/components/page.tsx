import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
	return (
		<div id="page" className="h-screen flex flex-col">
			<PageHeader title={"page title"} />
			<PageBody>
				<div className="grid grid-cols-12 p-4 min-h-full">
					{children}

					{/* {widgets.map((widget, i) => {
						return (
							<div
								key={i}
								className={cn("col-span-12", {
									"col-span-6": widget?.width === 6,
								})}
							>
								<Card className={cn("border-none")}>
									<CardHeader className={cn("px-0 py-2")}>
										<CardTitle>{widget.title}</CardTitle>
									</CardHeader>
									<CardContent className={cn("p-0")}>
										{widget?.content || <></>}
									</CardContent>
								</Card>
							</div>
						);
					})} */}
				</div>
			</PageBody>
		</div>
	);
}

export const PageHeader = ({ title }: { title: string }) => {
	return (
		<div className="py-3.5 px-4">
			<div className="text-sm opacity-60">{title}</div>
		</div>
	);
};

export const PageBody = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex-1 overflow-hidden">
			<div className="h-full overflow-auto">{children}</div>
		</div>
	);
};
