"use client"
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { default_login_redirect } from "@/route";
export const Social =  () => {
	const onClick =  async (provider: "Github" | "Google") => {
		
		signIn(provider, {
			callbackUrl: default_login_redirect
		})
	}
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button variant="outline" className="w-[50%]" size="lg" onClick={() => onClick("Google")}>
				<FcGoogle />
			</Button>
			<Button variant="default" className="w-[50%]" size="lg" onClick={() => onClick('Github')}>
				<FaGithub className="h-full" />
			</Button>
		</div>
	)
}

