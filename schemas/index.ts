import { UserRole } from "@prisma/client"
import * as z from "zod"

export const loginSchemas =  z.object({
	email: z.string().email({
		message: "Email is require"
	}),
	password: z.string().min(1, {
		message: "Password is require"
	}),
	code: z.optional(z.string()),

})
export const registerSchemas =  z.object({
	name: z.string().min(1, {
		message: "Name is required"
	}),
	email: z.string().email({
		message: "Email is required"
	}),
	password: z.string().min(6, {
		message: "Minimum 6 characters required "
	})

})

export const resetSchemas =  z.object({
	email: z.string().email({
		message: "Email is require"
	}),
})
export const newPasswordSchemas =  z.object({
	password: z.string().min(6, {
		message: "Minimum 6 characters required "
	})
})
export const settingSchemas= z.object({
	name: z.optional(z.string()),
	isTwoFactorEnabled: z.optional(z.boolean()),
	role: z.enum([UserRole.ADMIN, UserRole.USER]),
	email: z.optional(z.string().email()),
	password: z.optional(z.string().min(6)),
	newPassword: z.optional(z.string().min(6)),

})
	.refine((data) => {
		if(data.password && !data.newPassword){
			return false;
		}
		return true
	}, {
		message: "New password is required",
		path: ["newPassword"]
	})
	.refine((data) => {
		if(data.newPassword && !data.password){
			return false;
		}
		return true
	}, {
		message: "Password is required",
		path: ["password"]
	})