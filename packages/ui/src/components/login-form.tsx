"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "./providers/auth-provider";
import { useMutation } from "@tanstack/react-query";

export function LoginForm() {
	const { login } = useAuth();

	const { mutate: handleLogin, isPending } = useMutation({
		mutationKey: ["login"],
		mutationFn: login,
	});

	const form = useForm({
		// resolver: zodResolver(formSchema),
		defaultValues: { email: "", password: "" },
	});

	const handleSubmit = () => {
		handleLogin({});
	};

	return (
		<Card className="mx-auto min-w-[380px] max-w-lg">
			<CardHeader>
				<CardTitle className="text-lg">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit, console.log)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name={"email"}
								render={({ field }) => {
									return (
										<FormItem>
											<Label htmlFor="email">Email</Label>
											<FormControl>
												<Input id="email" type="email" {...field} required />
											</FormControl>
										</FormItem>
									);
								}}
							/>

							<FormField
								control={form.control}
								name={"password"}
								render={({ field }) => {
									return (
										<FormItem>
											<Label htmlFor="password">Password</Label>
											<FormControl>
												<Input
													id="password"
													type="password"
													{...field}
													required
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>

							<Button type="submit" className="w-full" disabled={isPending}>
								Login
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
