import { Resource } from "melony/config";

export const projectStatusResource: Resource = {
	id: "projectStatus",
	title: "Project Statuses",
	fields: [{ key: "title" }, { key: "color" }],
};
