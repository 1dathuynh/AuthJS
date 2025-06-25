import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { loginSchemas } from "./schemas"
import { getUserByEmail } from "./data/user"
import { getUserById } from "./data/user"
import bcrypt from 'bcrypt'
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/accout"
export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig,
	pages: {
		error: '/auth/error'
	},
	events: {
		async linkAccount({ user }){
			await db.user.update({
				where: {id: user.id},
				data: {emailVerified: new Date()}
			})
		}
	},
	callbacks: {
		async signIn({user, account}){
			
			if(account?.provider !== 'credentials') return true

				const existingUser = await getUserById(user.id)
			if(!existingUser?.emailVerified) return false
	
			//TODO: Add 2FA Check
			if(existingUser.isTwoFactorEnabled){
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
				if(!twoFactorConfirmation){
					return false;
				}
				//delete two factor for next sign in
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id
					}
				})
			}
			return true

		},
		async session({token, session}){
			if(token.sub && session.user){
				session.user.id = token.sub
			}
			if(session.user && token.role){
				session.user.role = token.role
			}	
			if(session.user){
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled 
			}				
			if(session.user){
				session.user.name = token.name
			}
			if(session.user){
				session.user.email = token.email as string
			}
			if(session.user){
				session.user.isOAuth = token.isOAuth as boolean
			}
			return session
		},
		async jwt({token}) {
			if(!token.sub){
				return token;
			}	
			const user = await getUserById(token.sub)
			if(!user){
				return token;
			}
			const existingAccount = await getAccountByUserId(user.id)
			token.isOAuth = !!existingAccount
			token.name = user.name
			token.email = user.email
			token.role = user.role
			token.isTwoFactorEnabled = user.isTwoFactorEnabled
			return token;
    }
	},
	providers: [
		Credentials({
			async authorize(credentials) {
			const validated = loginSchemas.safeParse(credentials);
			if(validated.success){
				const {email, password} = validated.data
				const user = await getUserByEmail(email);
				if(!user || !user.password){
					return null;
				}
				const passwordMatch =  await bcrypt.compare(password, user.password);
				if(passwordMatch) return user;
			}
			return null;
		}
	}),
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})

	]
})
