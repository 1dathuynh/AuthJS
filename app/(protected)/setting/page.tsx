"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { setting } from "@/actions/setting";
import * as z from "zod"
import  {useForm } from "react-hook-form"
import { settingSchemas } from "@/schemas";
import {
	Form,
	FormField,
	FormControl,
	FormLabel,
	FormDescription,
	FormMessage,
	FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/user-current";
import { FormSuccess } from "@/components/form-success";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormError } from "@/components/form-error";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

const  SettingPage = () => {
	const user = useCurrentUser();
	const { update } = useSession()
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const form = useForm<z.infer<typeof settingSchemas>>({
		resolver: zodResolver(settingSchemas),
		defaultValues:{
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			role: (user?.role as UserRole) ?? UserRole.USER,	
			isTwoFactorEnabled: user?.isTwoFactorEnabled ?? false,
		}
	})
	const onSubmit = (values: z.infer<typeof settingSchemas>) => {
		startTransition(() => {
			setting(values)
			.then((data) => {
					if(data?.error){
						setError(data.error )
					}
					if(data.success){
						update();
						setSuccess(data.success)
					}
				})
			.catch(() => setError("Something went wrong"))		
		})

	}
	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">Setting</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Name
									</FormLabel>
									<FormControl>
										<Input
										type="text"
										{...field}
										placeholder="John Doe"
										disabled={isPending}
										 />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							/>
							{user?.isOAuth === false && (
								<>
								<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email
									</FormLabel>
									<FormControl>
										<Input
										{...field}
										placeholder="John Doe@example.com"
										disabled={isPending}
										type="email"
										 />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							/>
							<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Password
									</FormLabel>
									<FormControl>
										<Input
										{...field}
										placeholder="******"
										type="password"
										disabled={isPending}
										 />
									</FormControl>
								</FormItem>
							)}
							/>
							<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										New Password
									</FormLabel>
									<FormControl>
										<Input
										{...field}
										placeholder="******"
										type="password"
										disabled={isPending}
										 />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							/>
								</>
							)}
							<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Role
									</FormLabel>
									<Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select role" />
											</SelectTrigger>
										</FormControl>
											<SelectContent>
												<SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
											</SelectContent>
												<SelectContent>
												<SelectItem value={UserRole.USER}>User</SelectItem>
											</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
							/>
							{user?.isOAuth === false && (
								<FormField
							control={form.control}
							name="isTwoFactorEnabled"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>
											Two Factor Authentication
										</FormLabel>
										<FormDescription>
											Enable two factor authentiation for your account
										</FormDescription>
									</div>
									<FormControl>
										<Switch 
										disabled={isPending}
										checked={!!field.value}
										onCheckedChange={field.onChange}
										/>
									</FormControl>
									
								</FormItem>
							)}
							/>
							)}
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button disabled={isPending} type="submit">Save</Button>

					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
export default SettingPage;