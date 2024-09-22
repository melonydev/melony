import { useAuth } from "./providers/auth-provider";

export function Protected({
	children,
}: {
	children: JSX.Element | React.ReactNode;
}) {
	const { user } = useAuth();

	if (!user) return <>unauthenticated</>;

	return children;
}
