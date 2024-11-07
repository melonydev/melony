"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "../providers/app-provider";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Markdown } from "../markdown";
import { UserIcon, BotIcon, StopCircleIcon, ArrowUpIcon } from "lucide-react";
import { ChatViewProps } from "@melony/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { motion } from "framer-motion";
import { useWindowSize } from "@/hooks/use-window-size";
import { useToast } from "../ui/use-toast";
import { Weather } from "../weather";
import { ViewRenderer } from "../view-renderer";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
}

export function ChatView({ viewId, ctx }: { viewId: string; ctx: any }) {
	const { config } = useApp();
	const view = config?.views?.[viewId] as ChatViewProps;
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");

	const chatId =
		ctx?.searchParams?.id || Math.random().toString(36).slice(2, 9);

	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>();

	const { data } = useQuery({
		queryKey: ["initialMessages", viewId, ctx],
		queryFn: async () => {
			const result = await view.getInitialMessagesAction(ctx);
			return result?.items || [];
		},
	});

	useEffect(() => {
		if (data !== undefined) {
			setMessages(
				data.map((item: any) => ({
					id: item?.id,
					role: item?.role,
					content: item?.content,
				})),
			);
		}
	}, [data]);

	const submitMutation = useMutation({
		mutationFn: async (input: string) => {
			const response = await fetch(
				typeof view?.action === "string" ? view?.action : "/api/chat",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: chatId,
						messages: [...messages],
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			return response;
		},
		onMutate: (input) => {
			const userMessage: Message = {
				id: Date.now().toString(),
				role: "user",
				content: input,
			};
			setMessages((prev) => [...prev, userMessage]);
		},
		onSuccess: async (response) => {
			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let assistantMessage: Message = {
				id: Date.now().toString(),
				role: "assistant",
				content: "",
			};

			setMessages((prev) => [...prev, assistantMessage]);

			while (true) {
				const { done, value } = await reader!.read();
				if (done) break;

				const chunk = decoder.decode(value);
				const lines = chunk.split("\n");
				for (const line of lines) {
					if (line.startsWith("0:")) {
						const content = line
							.slice(3)
							.replace(/^"|"$/g, "")
							.replace(/\\n/g, "\n");
						assistantMessage.content += content;
						setMessages((prev) =>
							prev.map((msg) =>
								msg.id === assistantMessage.id
									? { ...msg, content: assistantMessage.content }
									: msg,
							),
						);
					} else if (line.startsWith("e:") || line.startsWith("d:")) {
						// This is the end of the message, you might want to do something here
						console.log("Message completed:", line);
					}
				}
			}
		},
	});

	const handleSubmit = () => {
		if (!input.trim()) return;
		submitMutation.mutate(input);
		setInput("");
	};

	console.log(messages);

	return (
		<div className="container max-w-3xl mx-auto flex flex-col h-full">
			<div className="flex flex-col justify-between items-center gap-4 h-full">
				<div
					ref={messagesContainerRef}
					className="flex flex-col gap-4 h-full w-full items-center flex-1"
				>
					{messages.length === 0 && (
						<div className="flex flex-col h-full justify-center items-center opacity-40"></div>
					)}

					{messages.map((message) => (
						<ChatMessage
							key={message.id}
							role={message.role}
							content={message.content}
						/>
					))}

					<div
						ref={messagesEndRef}
						className="shrink-0 min-w-[24px] min-h-32"
					/>
				</div>

				<div className="fixed w-full max-w-3xl bottom-4 px-8">
					<div className="flex flex-row gap-2 relative items-end w-full px-4 md:px-0">
						<MultimodalInput
							input={input}
							setInput={setInput}
							handleSubmit={handleSubmit}
							isLoading={false}
							stop={stop}
							messages={messages}
							append={() => Promise.resolve("")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export const ChatMessage = ({
	role,
	content,
}: {
	role: string;
	content: string;
}) => {
	const renderMarkdownContent = (): string => {
		try {
			const parsedContent = JSON.parse(content);

			if (Array.isArray(parsedContent)) {
				return parsedContent
					.map((item) => {
						switch (item.type) {
							case "text":
								return item.text;
							default:
								return `Unsupported content type: ${item.type}`;
						}
					})
					.join("\n");
			} else {
				// Fallback for non-array content
				return content;
			}
		} catch (error) {
			// If parsing fails, assume it's a plain string
			return content;
		}
	};

	const renderToolsContent = () => {
		try {
			const parsedContent = JSON.parse(content);

			if (Array.isArray(parsedContent)) {
				return parsedContent.map((item, index) => {
					switch (item.type) {
						case "tool-call":
							return <div key={index}>THIS IS A TOOL CALL</div>;
						case "tool-result":
							return <ViewRenderer key={index} view={item.result} ctx={{}} />;
						default:
							return (
								<div key={index}>Unsupported content type: {item.type}</div>
							);
					}
				});
			}
			return <></>;
		} catch (error) {
			return <></>;
		}
	};

	return (
		<motion.div
			className={`flex flex-row gap-4 px-4 w-full md:px-0 first-of-type:pt-20`}
			initial={{ y: 5, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
		>
			<div className="size-[24px] flex flex-col justify-center items-center shrink-0">
				{role === "assistant" ? <BotIcon /> : <UserIcon />}
			</div>

			<div className="flex flex-col gap-2 w-full">
				{content && (
					<div className="flex flex-col gap-4">
						<Markdown>{renderMarkdownContent()}</Markdown>

						<div>{renderToolsContent()}</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};

const suggestedActions = [
	{
		title: "1-Day Startup Ideas",
		label: "AI based startups",
		action: "Give me 3 1-day ai saas startup ideas",
	},
	{
		title: "Answer like I'm 5,",
		label: "why is the sky blue?",
		action: "Answer like I'm 5, why is the sky blue?",
	},
];

export function MultimodalInput({
	input,
	setInput,
	isLoading,
	stop,
	messages,
	append,
	handleSubmit,
}: {
	input: string;
	setInput: (value: string) => void;
	isLoading: boolean;
	stop: () => void;
	messages: Array<Message>;
	append: () => Promise<string | null | undefined>;
	handleSubmit: () => void;
}) {
	const { toast } = useToast();

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { width } = useWindowSize();

	useEffect(() => {
		if (textareaRef.current) {
			adjustHeight();
		}
	}, []);

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
		}
	};

	const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(event.target.value);
		adjustHeight();
	};

	const submitForm = useCallback(() => {
		handleSubmit();

		if (width && width > 768) {
			textareaRef.current?.focus();
		}
	}, [handleSubmit, width]);

	return (
		<div className="relative w-full flex flex-col gap-4">
			{messages.length === 0 && (
				<div className="grid sm:grid-cols-2 gap-2 w-full md:px-0 mx-auto">
					{suggestedActions.map((suggestedAction, index) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.05 * index }}
							key={index}
							className={index > 1 ? "hidden sm:block" : "block"}
						>
							<button
								onClick={async () => {
									setInput(suggestedAction.action);
									submitForm();
								}}
								className="w-full text-left border rounded-lg p-2 text-sm transition-colors flex flex-col"
							>
								<span className="font-medium">{suggestedAction.title}</span>
								<span>{suggestedAction.label}</span>
							</button>
						</motion.div>
					))}
				</div>
			)}

			<Textarea
				ref={textareaRef}
				placeholder="Send a message..."
				value={input}
				onChange={handleInput}
				className="min-h-[24px] overflow-hidden resize-none rounded-lg text-base bg-muted"
				rows={3}
				onKeyDown={(event) => {
					if (event.key === "Enter" && !event.shiftKey) {
						event.preventDefault();

						if (isLoading) {
							toast({
								title: "Please wait for the model to finish its response!",
							});
						} else {
							submitForm();
						}
					}
				}}
			/>

			{isLoading ? (
				<Button
					className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
					onClick={(event) => {
						event.preventDefault();
						stop();
					}}
				>
					<StopCircleIcon size={14} />
				</Button>
			) : (
				<Button
					className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
					onClick={(event) => {
						event.preventDefault();
						submitForm();
					}}
					disabled={input.length === 0}
				>
					<ArrowUpIcon size={14} />
				</Button>
			)}
		</div>
	);
}
