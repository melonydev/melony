export const EmptyScreen = ({ title }: { title: string }) => {
	return (
		<div className="flex flex-col gap-2">
			<h5 className="opacity-40 text-sm">{title}</h5>
		</div>
	);
};
