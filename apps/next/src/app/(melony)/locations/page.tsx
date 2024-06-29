import { DefaultPage, SmartTable } from "melony/next";

export default function RootPage() {
	return (
		<DefaultPage>
			<SmartTable
				resource={{ model: "Location", fields: [] }}
				fields={[]}
				queryAction={{
					key: "listLocations",
					handler: async () => {
						"use server";

						return [];
					},
				}}
			/>
		</DefaultPage>
	);
}
