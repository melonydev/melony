import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const admin = await prisma.user.create({
		data: {
			id: 1,
			email: "d.daraselia@gmail.com",
			name: "Daras",
			password: "$2a$10$O0vK747YO3uy8YCdgEsC6eWWwycGP1a2QBLa2BVezhIULCVt8cRvS",
			image:
				"https://melonify-storage.sfo3.cdn.digitaloceanspaces.com/2024-05/1_org_zoom8.jpeg",
		},
	});

	const projectStatuses = await prisma.projectStatus.createMany({
		data: [
			{
				id: 1,
				title: "To Do",
				color: "#d946ef",
			},
			{
				id: 2,
				title: "In Progress",
				color: "#eab308",
			},
			{
				id: 3,
				title: "Done",
				color: "#84cc16",
			},
		],
	});

	console.log({ admin, projectStatuses });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
