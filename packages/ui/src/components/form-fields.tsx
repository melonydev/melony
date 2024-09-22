import { DEFAULT_COMPONENTS_MAP } from "@/constants";
import { Field } from "@melony/types";

export function FormFields({ fields }: { fields: Record<string, Field> }) {
	if (Object.keys(fields).length === 0) return null;

	return (
		<div className="flex flex-col gap-4 mb-2">
			{Object.keys(fields).map((fieldKey) => {
				const field = fields[fieldKey];

				if (!field) return null;

				let Comp =
					field?.components?.form ||
					DEFAULT_COMPONENTS_MAP[field?.type || "text"].form;

				return <Comp key={fieldKey} fieldKey={fieldKey} field={field} />;
			})}
		</div>
	);
}
