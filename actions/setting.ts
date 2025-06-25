"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { settingSchemas } from "@/schemas"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { generateVerificationToken } from "@/lib/tokens"
import bcrypt from "bcrypt"
import { sendVerificationEmail } from "@/lib/mail"
export const setting = async (values: z.infer<typeof settingSchemas>) => {
	const user = await currentUser();
	if(!user){
		return {error: "Unauthorized"}

	}
	const dbUser = await getUserById(user.id)
	if(!dbUser){
		return {error: "Unauthorized"}

	}
	if(user.isOAuth){
		values.email = undefined
		values.password = undefined
		values.newPassword = undefined
		values.isTwoFactorEnabled = undefined
	}
	if(values.email && values.email !== user.email){
		const existingUser = await getUserById(values.email)
		if(existingUser && existingUser.id !== user.id){
			return{error : "Email already in use"}
		}
		const verificationToken = await generateVerificationToken(values.email)
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)
		return { success : 'Verification email sent'}

	}
	if(values.password && values.newPassword && dbUser.password){
		const passwordMatch = bcrypt.compare(values.password, dbUser.password)
		if(!passwordMatch){
			return {error : "Incoorect Password"}
		}
		const hashPassword = await bcrypt.hash(values.newPassword, 10)
		values.password = hashPassword;
		values.newPassword = undefined
	}
	await db.user.update({ 
		where: {
			id: dbUser.id
		},
		data:{
			...values 
		}
	})
	return {success: "Update success"}
}