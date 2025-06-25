"use client"

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
	 children: React.ReactNode;
	 headerLabel: string;
	 backButtonLabel: string;
	 backButtonHref:string;
	 showSocial?: boolean;
}
export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref, showSocial} : CardWrapperProps) => {
	return (
		<Card className="w-[500px] shadow-xl">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>
				<div className="py-4">
				{children}
				</div>
			</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	)
}