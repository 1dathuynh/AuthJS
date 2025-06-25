"use client"

import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import { FormError } from "../form-error"

interface RoleGateProps{
	children: React.ReactNode
	allowedRole: UserRole
}
export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
	const session = useSession()
	const role = session.data?.user?.role;
	if(!role){
		<FormError message="You do not have permission access" />
	}
	return(
		<>
		{children}
		</>
	)
}