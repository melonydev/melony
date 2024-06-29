import { QueryProvider } from "./query-provider";

export async function MelonyProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <QueryProvider>{children}</QueryProvider>;
}
