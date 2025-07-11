import React from 'react'
import { Header } from '@/components/auth/header'
import{ BackButton } 
from "@/components/auth/back-button"
import  {
	Card, CardFooter, CardHeader
} from "@/components/ui/card" 
import { CardWrapper } from './card-wrapper'
import { FaExclamationCircle } from "react-icons/fa";const ErrorCard = () => {
	return (
		<CardWrapper 
		headerLabel='Email already in use with different provider!'
		backButtonHref='/auth/login'
		backButtonLabel='Back to login'>
			<div className='w-full flex justify-center items-center'>
				<FaExclamationCircle  className=' text-[25px] text-destructive'/>
			</div>
		</CardWrapper>
	)
}

export default ErrorCard
