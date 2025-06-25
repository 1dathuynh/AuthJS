'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import * as z from "zod"
import {Form, FormControl, FormField, FormMessage, FormLabel, FormItem} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper";
import { loginSchemas } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";import Link from "next/link";
;
const LoginForm = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const searchParams = useSearchParams();

	const urlError = searchParams.get('error') === "Configuration" ? "Email already in use with different provider! "
	: ""
	const form = useForm<z.infer<typeof loginSchemas>>({
		resolver: zodResolver(loginSchemas),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	const onsubmit = (values: z.infer<typeof loginSchemas>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			login(values)
				.then((data) => {
					if(data.error){
						form.reset();
						setError(data.error)
					}
					if(data.success){
						form.reset();
						setSuccess(data.success)
					}
					if(data.twoFactor){
						setShowTwoFactor(true);
					}
				})
				.catch(()=> {
					setError("Something went wrong")
				})
		})
	}
	
	return(
		<CardWrapper
		 	headerLabel="Welcome back!"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		 >
			<div>
				<Form {...form}>
				<form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
					<div className="space-y-6">
						{showTwoFactor && (
							<FormField control={form.control} name="code" render={({field}) => (
									<FormItem>
											<FormLabel>Two Factor Code</FormLabel>
											<FormControl> 
												<Input {...field} placeholder="123456" type="text" disabled={isPending}/>
											</FormControl>
										<FormMessage />
									</FormItem>
								)} />
						)}
						{!showTwoFactor &&(
							<>
								<FormField control={form.control} name="email" render={({field}) => (
									<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl> 
												<Input {...field} placeholder="john.doe@example.com" type="email" disabled={isPending}/>
											</FormControl>
										<FormMessage />
									</FormItem>
									)} />
								<FormField control={form.control} name="password" render={({field}) => (
									<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input placeholder="******" type="password" {...field} disabled={isPending} />
											</FormControl>
											<FormControl>
												<Button size='sm' variant='link' asChild className="px-0 font-normal pt-5">
													<Link href={'/auth/reset'}>Forgot password?</Link>
												</Button>
											</FormControl>
										<FormMessage />
									</FormItem>
									)} />
							</>)
						
						}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success}/>
					<Button type="submit" className="w-full" disabled={isPending}>{showTwoFactor ? "Confirm" : "Login"}</Button>
				</form>
			</Form>
			</div>
		</CardWrapper>
	)
}
export default LoginForm;