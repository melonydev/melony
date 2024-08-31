import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { Field } from "@melony/types";

export function FormFields({ fields }: { fields: Field[] }) {
	return (
		<div className="flex flex-col gap-4 mb-2">
			{(fields || []).map((field) => {
				let Comp =
					field?.components?.form ||
					DEFAULT_COMPONENTS_MAP[field?.type || "text"].form;

				return <Comp key={field.key} field={field} />;
			})}
		</div>
	);
}
