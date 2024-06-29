import { MelonyApp } from "melony/next";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <MelonyApp>{children}</MelonyApp>;
}
