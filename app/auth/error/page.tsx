import ErrorCard from '@/components/auth/error-card'
import React from 'react'

const ErrorPage = () => {
	return (
		<div className="h-full flex justify-center
		 items-center bg-radial-[at_25%_75%]
		  from-indigo-500 via-purple-500
			 to-pink-500 to_50%">
				<ErrorCard />
		 </div>
	)
}

export default ErrorPage
