import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createAction } from "./crud";

const FILES_COLLECTION = "file"; // TODO: User collection is hardcoded for now

export const uploadAction = async ({ formData }: { formData: FormData }) => {
	"use server";
	const Bucket = process.env.AMPLIFY_BUCKET;

	let space = new S3Client({
		forcePathStyle: false, // Configures to use subdomain/virtual calling format.
		endpoint: `https://${process.env.AWS_REGION}.digitaloceanspaces.com`,
		region: "us-east-1", // aws specific, do not pay attention
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
		},
	});

	try {
		const files = formData.getAll("files") as File[];

		const filesRes = await Promise.all(
			files.map(async (item) => {
				const date = new Date();
				const filePath = date.toISOString().slice(0, 7) + "/" + item.name;

				let Body;
				try {
					Body = (await item.arrayBuffer()) as Buffer;
				} catch (err) {
					console.log(err);
				}

				await space.send(
					new PutObjectCommand({
						Bucket,
						Key: filePath,
						Body,
						ACL: "public-read",
					}),
					{},
				);

				const downloadUrl = `https://${process.env.AMPLIFY_BUCKET}.${process.env.AWS_REGION}.cdn.digitaloceanspaces.com/${filePath}`;

				const fileRes = await createAction({
					resource: { model: FILES_COLLECTION, fields: [] },
					data: {
						downloadUrl,
						name: item.name,
					},
				});

				return { ...fileRes, downloadUrl };
			}),
		);

		return { files: filesRes };
	} catch (err) {
		console.log(err);
		return { files: [] };
	}
};
