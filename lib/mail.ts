import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendTwoFactorEmail = async(email:string, token:string) => {
	await resend.emails.send({
		from: "mail@datfujin.online",
		to: email,
		subject: "2FA CODE",
		html: `<p>Your 2FA Code: ${token}</p>`
	})
}
export const sendVerificationEmail = async (
	email: string,
	token: string
) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;
	await resend.emails.send({
		from: "mail@datfujin.online",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href='${confirmLink}'>here to confirm email!</a></p>`
	})

}
export const sendPasswordResetEmail  = async (email:string,  token: string) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`
	await resend.emails.send({
		from: "mail@datfujin.online",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href='${resetLink}'>here to reset password!</a></p>`
	})
}