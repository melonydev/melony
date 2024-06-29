import React from "react";
import { FilterItem, Resource } from "@melony/types";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { SmartForm } from "./smart-form";
import { useCreate, useUpdate, useList, useDelete } from "@/hooks";
import { Ellipsis, PlusIcon, X } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConfirmDialog } from "../confirm-dialog";
import { AdvancedFilter } from "../advanced-filter";
import { DisplayText } from "../display-fields/display-text";
import { DisplayImage } from "../display-fields/display-image";
import { DisplayRelationship } from "../display-fields/display-relationship";
import { SmartTabbedRelatedLists } from "./smart-tabbed-related-lists";
import { DisplayColor } from "../display-fields/display-color";
import { Card } from "../ui/card";

const DISPLAY_FIELDS_MAP = {
	String: DisplayText,

	// Melony specific "component"
	Document: DisplayRelationship,
	Image: DisplayImage,
	Color: DisplayColor,
};

export function SmartCards({
	resource,
	initialFilter,
}: {
	resource: Resource;
	initialFilter?: FilterItem[];
}) {
	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "show" | "update" | "create" | "delete";
		data?: any;
	} | null>(null);

	const [filter, setFilter] = React.useState<FilterItem[]>(initialFilter || []);

	const { data = [], isLoading } = useList({
		resource,
		filter,
	});

	const { mutate: create, isPending: isCreating } = useCreate({
		resource,
	});

	const { mutate: update, isPending: isUpdating } = useUpdate({
		resource,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	const { mutate: remove, isPending: isRemoving } = useDelete({
		resource,
		onSuccess: () => {
			setActiveDoc(null);
		},
	});

	return (
		<div id="table" className="h-full flex flex-col">
			<div className="flex justify-between items-center py-4">
				<div className="flex items-center gap-2">
					<Input placeholder="Search..." />
					<AdvancedFilter
						resource={resource}
						values={filter}
						onChange={(filter) => {
							console.log("filterChange", filter);
							setFilter(filter);
						}}
					/>
				</div>
				<div>
					<Button
						variant="outline"
						onClick={() => {
							setActiveDoc({ mode: "create" });
						}}
					>
						<PlusIcon className="w-4 h-4 mr-2" />
						Create
					</Button>
				</div>
			</div>
			<div className="flex-1">
				<div className="grid sm:grid-cols-4 2xl:grid-cols-6 gap-2">
					{data.map((item: any) => {
						return (
							<Card
								key={data.id}
								className="cursor-pointer"
								onClick={() => {
									setActiveDoc({ mode: "update", data: item });
								}}
							>
								<div className="flex flex-col gap-4">
									<div className="p-2 font-semibold">{item?.["id"]}</div>

									{(resource?.fields || []).map((field) => {
										const Comp = DISPLAY_FIELDS_MAP["String"];

										return (
											<div key={field.name} className="p-2">
												<Comp field={field} defaultValue={item?.[field.name]} />
											</div>
										);
									})}
								</div>
							</Card>
						);
					})}
				</div>
			</div>

			<Dialog
				open={activeDoc?.mode === "create"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[44rem]">
					<DialogHeader>
						<div className="flex justify-between items-center">
							<DialogTitle>Create</DialogTitle>
							<div className="flex gap-2 items-center">
								<DialogClose asChild>
									<Button size="sm" variant="ghost">
										<X className="h-4 w-4" />
									</Button>
								</DialogClose>
							</div>
						</div>
					</DialogHeader>

					<DialogBody>
						<SmartForm
							resource={resource}
							onSubmit={(data) => {
								create(data, {
									onSuccess: () => {
										setActiveDoc(null);
									},
								});
							}}
							isSubmitting={isCreating}
						/>
					</DialogBody>
				</DialogContent>
			</Dialog>

			<Dialog
				open={activeDoc?.mode === "update"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[80rem]">
					<DialogHeader>
						<div className="flex justify-between items-center">
							<DialogTitle>Update</DialogTitle>
							<div className="flex gap-1 items-center">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="sm" variant="ghost">
											<Ellipsis className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem
											onClick={() => {
												setActiveDoc((prev) => ({
													mode: "delete",
													data: prev?.data,
												}));
											}}
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>

								<DialogClose asChild>
									<Button size="sm" variant="ghost">
										<X className="h-4 w-4" />
									</Button>
								</DialogClose>
							</div>
						</div>
					</DialogHeader>

					<DialogBody>
						<div className="flex flex-col gap-4">
							<SmartForm
								resource={resource}
								values={activeDoc?.data}
								onSubmit={update}
								isSubmitting={isUpdating}
							/>

							<SmartTabbedRelatedLists
								resource={resource}
								doc={activeDoc?.data || {}}
							/>
						</div>
					</DialogBody>
				</DialogContent>
			</Dialog>

			<ConfirmDialog
				open={activeDoc?.mode === "delete"}
				onClose={() => setActiveDoc(null)}
				onConfirm={() => {
					remove({ id: activeDoc?.data?.id });
				}}
				isConfirming={isRemoving}
			/>
		</div>
	);
}
