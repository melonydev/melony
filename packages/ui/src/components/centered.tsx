export function Centered({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center h-full w-full">
			{children}
		</div>
	);
}
