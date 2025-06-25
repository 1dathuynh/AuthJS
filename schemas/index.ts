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
