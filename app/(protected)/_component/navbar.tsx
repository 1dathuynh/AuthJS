"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import UserButon from '@/components/auth/user-button'
const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav className='bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm w-[600px]'>
			<div className='flex gap-x-2'>
				<Button variant={pathname == '/server' ? "default" : "outline"} asChild>
					<Link href='/server'>Server</Link>
				</Button>
				<Button variant={pathname == '/setting' ? "default" : "outline"} asChild>
					<Link href='/setting'>Settings</Link>
				</Button>
				<Button variant={pathname == '/client' ? "default" : "outline"} asChild>
					<Link href='/client'>Client</Link>
				</Button>
				<Button variant={pathname == '/admin' ? "default" : "outline"} asChild>
					<Link href='/admin'>Admin</Link>
				</Button>
			</div>
			<UserButon />
		</nav>
	)
}

export default Navbar
