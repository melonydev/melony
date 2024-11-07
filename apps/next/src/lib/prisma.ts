import { Prisma, PrismaClient } from "@prisma/client";
import { FilterItem } from "melony";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };

function isStringNumber(value: string): boolean {
	return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}

function convertValue(value: any): any {
	if (typeof value === "string" && isStringNumber(value)) {
		return Number(value);
	}
	return value;
}

export function filterToPrismaQuery(filters: FilterItem[]): Prisma.JsonObject {
	return filters.reduce((acc, filter) => {
		const { field, operator, value } = filter;
		const convertedValue = convertValue(value);

		if (!value) return acc;

		switch (operator) {
			case "Is":
				acc[field] = { equals: convertedValue };
				break;
			case "Contains":
				acc[field] = { contains: convertedValue };
				break;
			case "DoesNotContain":
				acc[field] = { not: { contains: convertedValue } };
				break;
			case "IsAnyOf":
				acc[field] = {
					in: Array.isArray(value) ? value.map(convertValue) : [convertedValue],
				};
				break;
			case "GeoWithinBox":
				// Assuming value is an object with minLat, maxLat, minLng, maxLng
				acc[field] = {
					gte: [convertValue(value.minLng), convertValue(value.minLat)],
					lte: [convertValue(value.maxLng), convertValue(value.maxLat)],
				};
				break;
			default:
				throw new Error(`Unsupported operator: ${operator}`);
		}

		return acc;
	}, {} as Prisma.JsonObject);
}

type InputOrderBy = Array<{ id: string; desc: boolean }>;

// Generic type for any Prisma model's OrderByInput
type PrismaOrderByInput = {
	[key: string]: Prisma.SortOrder;
};

export function convertToPrismaOrderBy<T extends PrismaOrderByInput>(
	input: InputOrderBy,
): T[] {
	return input.map((item) => ({
		[item.id]: item.desc ? Prisma.SortOrder.desc : Prisma.SortOrder.asc,
	})) as T[];
}
