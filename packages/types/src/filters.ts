export type FilterItem = {
	field: string;
	operator: "Is" | "Contains" | "DoesNotContain" | "IsAnyOf" | "GeoWithinBox";
	value: any;
};
