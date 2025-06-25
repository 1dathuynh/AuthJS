"use server"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import * as z from "zod"
import { loginSchemas } from "@/schemas"
import { revalidatePath,revalidateTag } from "next/cache"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import { default_login_redirect } from "@/route"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
export const login = async (values: z.infer<typeof loginSchemas>) => {
	const validated = loginSchemas.safeParse(values);
	if(!validated.success){
		return { error: "Invalid field! "}
	}
	const {email, password, code} = validated.data;
	const existingUser = await getUserByEmail(email);
	if(!existingUser || !existingUser.email || !existingUser.password){
		return { error: "Email does not exits!"}
	}
	
	if(!existingUser.emailVerified){
		const verificationToken = await generateVerificationToken
		(existingUser.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)
		return { success : "Confirmation email sent!"};
	}

	if(existingUser.isTwoFactorEnabled && existingUser.email){
		if(code){
			// to do : verify code
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
			if(!twoFactorToken){
			return {error: "Invalid Code"}
			}
			if(twoFactorToken.token !== code){
				return {error: "Invalid Code"}
			}
			const hasExpired = new Date(twoFactorToken.expires) < new Date();
			if(hasExpired){
				return {error: "Code expired"}
				
			}
			await db.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id
				}
			});
			const existingConfirmation  = await getTwoFactorConfirmationByUserId(existingUser.id)
			if(existingConfirmation){
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id
					}
				})
			}
			await db.twoFactorConfirmation.create({
				data:{
					userId: existingUser.id
				}
			})
		}
		else{
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			console.log(twoFactorToken);
			await sendTwoFactorEmail(
				twoFactorToken.email,
				twoFactorToken.token
			)
			return { twoFactor: true}
		}
	}
	try {
		await signIn("credentials", {
			email, password, redirectTo: default_login_redirect
	 })
	} catch (error) {
		if(error instanceof AuthError){
			switch (error.type) {
				case "CredentialsSignin":
					return {error: "Invalid credentials!"}
				
				default:
					return {error: "Something went wrong!"}
			}
		}
		throw error
	}

	return {success: "Email sent"}
}