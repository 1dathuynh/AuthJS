'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import * as z from "zod"
import {Form, FormControl, FormField, FormMessage, FormLabel, FormItem} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper";
import { newPasswordSchemas } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";
const NewPasswordForm = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	
	const form = useForm<z.infer<typeof newPasswordSchemas>>({
		resolver: zodResolver(newPasswordSchemas),
		defaultValues: {
			password: "",
		}
	});
	const onsubmit = (values: z.infer<typeof newPasswordSchemas>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			newPassword(values, token)
				.then((data) => {
					setError(data.error)
					setSuccess(data.success)
				})
		})
		console.log(values);
		
	}
	
	return(
		<CardWrapper
		 	headerLabel="Enter a new password"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
			showSocial
		 >
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
					<div className="space-y-6">
						<FormField control={form.control} name="password" render={({field}) => (
						<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl> 
									<Input {...field} placeholder="******" type="password" disabled={isPending}/>
								</FormControl>
              <FormMessage />
						</FormItem>
					)} />
					</div>
					<FormError message={error} />
					<FormSuccess message={success}/>
					<Button type="submit" className="w-full" disabled={isPending}>Reset Password</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
export default NewPasswordForm;