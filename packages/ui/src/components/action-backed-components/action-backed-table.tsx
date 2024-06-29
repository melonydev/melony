import { DataTable } from "../data-table";

export function ActionBackedTable() {
	return (
		<DataTable columns={[{ header: "id" }]} data={[]} onClickRow={() => {}} />
	);
}
