"use server";

import {
	convertToPrismaOrderBy,
	filterToPrismaQuery,
	prisma,
} from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CoreMessage } from "ai";
import { BaseContext, DetailViewAction, ListViewAction } from "melony";

export const listConversationsAction: ListViewAction = async ({
	searchParams: { filter, paginate, sort },
}) => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [], meta: { total: 0 } };
	}

	const where = filterToPrismaQuery(filter || []);
	const take = paginate?.pageSize || 10;
	const skip = take * (paginate?.pageIndex || 0);
	const orderBy = convertToPrismaOrderBy(sort || []);

	const res = await prisma.conversation.findMany({
		where,
		take,
		skip,
		orderBy,
	});

	return {
		items: res,
		meta: {
			total: await prisma.conversation.count({
				where,
			}),
		},
	};
};

export const getOneConversationAction: DetailViewAction = async ({
	searchParams,
}) => {
	const doc = await prisma.conversation.findUnique({
		where: { id: searchParams?.id as string },
	});

	return doc || {};
};

export const upsertConversation = (id: string, messages: CoreMessage[]) => {
	return prisma.conversation.upsert({
		where: { id },
		update: {
			title: (messages[0]?.content as string) || "Untitled",
			messages: {
				create: messages.map((msg) => ({
					role: msg.role,
					content:
						typeof msg.content === "string"
							? msg.content
							: JSON.stringify(msg.content),
				})),
			},
		},
		create: {
			id,
			title: (messages[0]?.content as string) || "Untitled",
			messages: {
				create: messages.map((msg) => ({
					role: msg.role,
					content:
						typeof msg.content === "string"
							? msg.content
							: JSON.stringify(msg.content),
				})),
			},
		},
	});
};

export const getMessagesAction: ListViewAction = async ({
	searchParams = {},
	initialFilter = [],
}) => {
	const { isAuthenticated } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		return { items: [], meta: { total: 0 } };
	}

	const where = filterToPrismaQuery(
		[...(searchParams?.filter || []), ...initialFilter] || [],
	);

	const take = searchParams?.paginate?.pageSize || 10;
	const skip = take * (searchParams?.paginate?.pageIndex || 0);
	const orderBy = convertToPrismaOrderBy(searchParams?.sort || []);

	const res = await prisma.message.findMany({
		include: { conversation: true },
		where,
		take,
		skip,
		orderBy,
	});

	return {
		items: res,
		meta: {
			total: await prisma.message.count({
				where,
			}),
		},
	};
};

export const getInitialMessagesAction = (ctx: BaseContext) => {
	if (ctx?.searchParams?.id) {
		return getMessagesAction({
			initialFilter: [
				{
					field: "conversationId",
					operator: "Is",
					value: ctx?.searchParams?.id,
				},
			],
		});
	}

	return Promise.resolve({});
};
