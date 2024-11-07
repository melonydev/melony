import { RelationshipField } from "@melony/types";
import { DisplayFieldProps } from "./types";
import { SmartBadge } from "../smart-badge";

export const DisplayRelationship = ({
	field,
	value,
}: DisplayFieldProps & { field: RelationshipField }) => {
	// always make it array because the relationship can be one or many
	const docs = Array.isArray(value) ? value : [value];

	return (
		<div className="flex items-center gap-1">
			{docs.map((doc, i) => {
				const title = field?.titleKey
					? doc?.[field?.titleKey]
					: doc?.title || doc?.name || doc?.id;

				const color = field?.colorKey ? doc?.[field?.colorKey] : doc?.color;

				const image = field?.imageKey
					? doc?.[field?.imageKey]
					: doc?.image || doc?.avatar || doc?.icon || doc?.logo;

				return <SmartBadge key={i} title={title} color={color} image={image} />;
			})}
		</div>
	);
};
