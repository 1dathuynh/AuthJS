"use server"
import * as z from "zod"
import { registerSchemas } from "@/schemas"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { getUserByEmail } from "@/data/user"
import {sendVerificationEmail} from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
export const register = async (values: z.infer<typeof registerSchemas>) => {
	const validated = registerSchemas.safeParse(values);
	if(!validated.success){
		return { error: "Invalid field! "}
	}
	const {name, email, password} = validated.data
	const existEmail = await getUserByEmail(email);
	if(existEmail){
		return {error: "Email already in use!"}
	}
	const passwordHash = await bcrypt.hash(password, 10)

	await db.user.create({
		data:{
			name: name,
			email: email,
			password: passwordHash
		}
	})
	const verificationToken = await generateVerificationToken(email);

	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token
	);
	return {success: "Confirmation email sent!"}
} 