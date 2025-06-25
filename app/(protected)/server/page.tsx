import { UserInfo } from '@/components/auth/user-info';
import { currentUser } from '@/lib/auth';
import { ExtenededUser } from '@/types/next-auth';
import React from 'react'

const ServerPage = async () => {
	const user = await currentUser() as ExtenededUser;
	return (
		<>
			<UserInfo user={user} label='Server Component'/>
		</>
	)
}

export default ServerPage
