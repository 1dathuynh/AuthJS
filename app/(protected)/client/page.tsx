"use client"
import { UserInfo } from '@/components/auth/user-info';
import { useCurrentUser } from '@/hooks/user-current';
import React from 'react'

const ClientPage = () => {
	const user = useCurrentUser();
	return (
		<>
			{user && (
				<UserInfo user={{
					...user,
					role: user.role as "USER" | "ADMIN",
				}} label='Client Component'/>
			)}
		</>
	)
}

export default ClientPage
