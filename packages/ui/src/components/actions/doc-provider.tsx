import { createContext, useContext } from "react";

export const DocContext = createContext<{
	doc: any;
	isLoading?: boolean;
}>({
	doc: {},
});

export function DocProvider({
	children,
	doc = {},
	isLoading,
}: {
	children: React.ReactNode;
	doc?: any;
	isLoading?: boolean;
}) {
	const value = { doc, isLoading };

	return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
}

export const useDoc = () => {
	const context = useContext(DocContext);

	if (context === undefined)
		throw new Error("useDoc must be used within a DocProvider");

	return context;
};
