import { RelationshipField } from "@melony/types";
import { Badge } from "../ui/badge";
import { DisplayFieldProps } from "./types";
import { Avatar, AvatarImage } from "../ui/avatar";

export const DisplayRelationship = ({
	field,
	defaultValue,
}: DisplayFieldProps & { field: RelationshipField }) => {
	// always make it array because the relationship can be one or many
	const docs = Array.isArray(defaultValue) ? defaultValue : [defaultValue];

	return (
		<div className="flex items-center gap-1">
			{docs.map((doc) => {
				const title = field?.displayField
					? doc?.[field?.displayField]
					: doc?.title || doc?.name || doc?.id;

				const color = field?.colorField ? doc?.[field?.colorField] : doc?.color;

				const image = field?.imageField
					? doc?.[field?.imageField]
					: doc?.image || doc?.avatar || doc?.icon || doc?.logo;

				return (
					<div key={doc.id} className="min-w-[0] flex items-center gap-2">
						{image && (
							<Avatar className="w-6 h-6">
								<AvatarImage src={image} />
							</Avatar>
						)}

						<Badge variant="secondary" color={color}>
							<div className="flex items-center">
								{color && (
									<div
										className="w-3 h-3 rounded-full mr-2"
										style={{ backgroundColor: color }}
									/>
								)}
								<span className="block truncate">{title}</span>
							</div>
						</Badge>
					</div>
				);
			})}
		</div>
	);
};
