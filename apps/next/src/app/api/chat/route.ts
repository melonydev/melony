import { upsertConversation } from "@/app/(melony)/actions/conversations";
import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, Message, streamText } from "ai";
import { listView } from "melony";
import { z } from "zod";

export async function POST(request: Request) {
	const { id, messages }: { id: string; messages: Array<Message> } =
		await request.json();

	const coreMessages = convertToCoreMessages(messages);

	const result = await streamText({
		model: anthropic("claude-3-5-sonnet-20240620"),
		messages: coreMessages,
		tools: {
			viewRenderer: {
				description: "Define the view config.",
				parameters: z.object({
					fields: z.any(),
					endpoint: z.string(),
				}),
				execute: async ({ fields, endpoint }) => {
					console.log("fields:", fields);

					return listView({
						fields,
						action: endpoint,
					});
				},
			},
		},
		system: `You are a friendly assistant. Keep your responses concise and helpful. 
			If asked to list result from some endpoint, use viewRenderer tool.
			If asked to modify fields, provide fields parameter to viewRenderer by following this structure:
			export type BaseField = {
				label?: string;
				description?: string;
				isRequired?: boolean;
				isList?: boolean;
				isUnique?: boolean;
				isId?: boolean;
				isReadOnly?: boolean;
				default?: unknown;
				isDisplayField?: boolean;
				documentation?: string | undefined;
				components?: {
					display: any;
					form: any;
				};
				hasAccess?: HasAccess;
				filterable?: boolean;
				sortable?: boolean;
			};

			export type TextField = BaseField & {
				type?: "text";
				maxLength?: number;
				minLength?: number;
			};

			export type NumberField = BaseField & {
				type?: "number";
				max?: number;
				min?: number;
			};

			export type CheckboxField = BaseField & {
				type?: "checkbox";
			};

			export type ColorField = BaseField & {
				type?: "color";
			};

			export type RelationshipField = BaseField & {
				type?: "relationship";
				getSuggestions?: ({ q }: { q: string }) => Promise<SelectOption[]>;
				valueAsNumber?: boolean;
				displayField?: string;
				titleKey?: string;
				colorKey?: string;
				imageKey?: string;
			};

			export type SelectField = BaseField & {
				type?: "select";
				options?: { label: string; value: any }[];
			};

			export type RichTextField = BaseField & {
				type?: "rich";
			};

			export type ImageField = BaseField & {
				type?: "image";
			};

			export type EmailField = BaseField & {
				type?: "email";
			};

			export type PasswordField = BaseField & {
				type?: "password";
			};

			export type Field =
				| TextField
				| NumberField
				| CheckboxField
				| RelationshipField
				| ColorField
				| SelectField
				| RichTextField
				| ImageField
				| EmailField
				| PasswordField;

			example: fields: Record<string, Field>

			If fields weren't mentioned at all, keep the parameter undefiend.
			`,
		onFinish: async ({ responseMessages }) => {
			console.log("responseMessages", responseMessages);
			const updatedMessages = [...coreMessages, ...responseMessages];

			await upsertConversation(id, updatedMessages);
		},
	});

	return result.toDataStreamResponse({});
}
