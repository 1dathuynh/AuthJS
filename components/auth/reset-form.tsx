'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import * as z from "zod"
import {Form, FormControl, FormField, FormMessage, FormLabel, FormItem} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper";
import { resetSchemas } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";import Link from "next/link";
import { reset } from "@/actions/reset";
;
const ResetForm = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	
	const form = useForm<z.infer<typeof resetSchemas>>({
		resolver: zodResolver(resetSchemas),
		defaultValues: {
			email: "",
		}
	});
	const onsubmit = (values: z.infer<typeof resetSchemas>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			reset(values)
				.then((data) => {
					setError(data.error)
					setSuccess(data.success)
				})
		})
		console.log(values);
		
	}
	
	return(
		<CardWrapper
		 	headerLabel="Forgot your password !"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
			showSocial
		 >
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
					<div className="space-y-6">
						<FormField control={form.control} name="email" render={({field}) => (
						<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl> 
									<Input {...field} placeholder="john.doe@example.com" type="email" disabled={isPending}/>
								</FormControl>
              <FormMessage />
						</FormItem>
					)} />
					</div>
					<FormError message={error} />
					<FormSuccess message={success}/>
					<Button type="submit" className="w-full" disabled={isPending}>Send Email</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
export default ResetForm;