"use server"
import *  as z from "zod";
import { newPasswordSchemas } from "@/schemas"; 
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcrypt"
export const newPassword = async (values : z.infer<typeof newPasswordSchemas>, token:string | null,) => {
	if(!token){
		return {error: "Missing token"}
	}
	const validatedFields = newPasswordSchemas.safeParse(values);
	if(!validatedFields.success){
		return {erorr: "Invalid field!"}
	}
	const { password } = validatedFields.data
	const existingToken = await getPasswordResetTokenByToken(token)
	if(!existingToken){
		return {erorr: "Invalid token!"} 
	}
	const hasExpired = new Date(existingToken.expires) < new Date()
	if(hasExpired){
		return {erorr: "Token has expired!"}
	}
	const existingUser = await getUserByEmail(existingToken.email)
	if(!existingUser){
		return {erorr: "Email does not exist!"}
	}
	const hashPassword =  await bcrypt.hash(password, 10);
	await db.user.update({
		where: {
			id: existingUser.id
		},
		data: {
			password: hashPassword
		}
	})
	await db.passwordResetToken.delete({
		where: {
			id: existingToken.id
		}
	})
	return {success : "Password updated"}
}