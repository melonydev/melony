import { Page } from "@melony/ui";

export async function DefaultPage({ children }: { children: React.ReactNode }) {
	return <Page>{children}</Page>;
}

export function makePage() {
	return async function TablePage({ params }: { params: { slug: string } }) {
		return (
			<Page>
				<></>
			</Page>
		);
	};
}
