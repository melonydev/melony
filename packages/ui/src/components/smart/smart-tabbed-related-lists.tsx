import { RelationshipField, Resource } from "@melony/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useApp } from "../providers/app-provider";
import { SmartTable } from "./smart-table";

export function SmartTabbedRelatedLists({
	resource,
	doc,
}: {
	resource: Resource;
	doc: any;
}) {
	const { models = [], resources } = useApp();
	const relatedListFields = resource.fields.filter(
		(f) => f.isList,
	) as RelationshipField[];

	if (relatedListFields.length === 0) return <></>;

	return (
		<Tabs
			defaultValue={relatedListFields?.[0]?.name}
			className="flex flex-col h-full overflow-hidden"
		>
			<TabsList>
				{relatedListFields.map((relatedListField) => (
					<TabsTrigger
						key={relatedListField.name}
						value={relatedListField.name}
					>
						{relatedListField.name}
					</TabsTrigger>
				))}
			</TabsList>

			{relatedListFields.map((relatedListField) => {
				const relatedModel = models.find(
					(x) => x.name === relatedListField.relatedModel,
				);

				const relatedResource = resources.find(
					(x) => x.model === relatedListField.relatedModel,
				);

				if (!relatedResource) return <>Resource not found</>;
				if (!relatedModel) return <>Model not found</>;

				const relatedModelFields = (relatedModel?.fields ||
					[]) as RelationshipField[];

				const relationField = relatedModelFields.find(
					(x) => x.relatedModel === resource.model,
				) as RelationshipField;

				const relationFromFields = relationField?.relationFromFields;

				return (
					<TabsContent
						key={relatedListField.name}
						value={relatedListField.name}
						className="overflow-auto"
					>
						{relatedModel && (
							<SmartTable
								resource={relatedResource}
								initialFilter={[
									{
										field: relationFromFields?.[0] || "unknown",
										operator: "Is",
										value: doc?.id,
									},
								]}
							/>
						)}
					</TabsContent>
				);
			})}
		</Tabs>
	);
}
