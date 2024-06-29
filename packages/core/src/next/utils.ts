import fs from "fs";
import { Page, Resource } from "@melony/types";
import { generateModels } from "..";
import { headers } from "next/headers";
import path from "path";

export const getPathname = () => {
	const headersList = headers();
	return headersList.get("x-pathname") || "";
};

export function deepMerge(obj1: any, obj2: any) {
	for (let key in obj2) {
		if (obj2.hasOwnProperty(key)) {
			if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
				obj1[key] = deepMerge(obj1[key], obj2[key]);
			} else {
				obj1[key] = obj2[key];
			}
		}
	}
	return obj1;
}

export const mergeResourcesWithModels = (resources: Resource[]) => {
	const newResources: Resource[] = [];

	const models = generateModels();

	// resources.map((resource) => {
	// 	const correspondingModel = models.find((m) => m.name === resource.model);

	// 	const fields: Field[] = [];

	// 	resource.fields.map((field) => {
	// 		fields.push(
	// 			deepMerge(
	// 				(correspondingModel?.fields || []).find((x) => x.name === field.name),
	// 				field,
	// 			),
	// 		);
	// 	});

	// 	newResources.push({
	// 		...resource,
	// 		fields,
	// 	});
	// });

	models.map((model) => {
		newResources.push({
			model: model.name,
			fields: model?.fields || [],
		});
	});

	return newResources;
};

export function getDirectories(path: string) {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path + "/" + file).isDirectory();
	});
}

function findDirectoriesWithPage(directoryPath: string) {
	try {
		const files = fs.readdirSync(directoryPath);

		const direactoriesWithMetaData: Page[] = [];

		files.map((file) => {
			const filePath = path.join(directoryPath, file);
			// Check if it's a directory
			if (fs.statSync(filePath).isDirectory()) {
				// Check if page.tsx exists inside
				if (fs.existsSync(path.join(filePath, "page.tsx"))) {
					// Check if meta.json exists
					const metaPath = path.join(filePath, "meta.json");

					let metaData: Page | undefined = undefined;

					if (fs.existsSync(metaPath)) {
						try {
							// Read and parse meta.json
							metaData = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
						} catch (error) {
							console.error(`Error reading meta.json in ${filePath}:`, error);
						}
					}

					direactoriesWithMetaData.push({
						title: metaData?.title || file,
						path: file,
						icon: metaData?.icon,
					});
				}
			}
			return false; // Exclude directories without page.tsx or error
		});

		return direactoriesWithMetaData;
	} catch (error) {
		console.error("Error finding directories:", error);
		return []; // Return empty array on error
	}
}

export async function getPages() {
	return findDirectoriesWithPage(path.resolve("./src/app/(melony)"));
}
