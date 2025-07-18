"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react"
import { toast } from "sonner";


const AdminPage = () => {
	const session = useSession();
	const onServerActionClick = ()=> {
		admin()
			.then((data) => {
				if(data.error){
					toast.error(data.error)
				}
				if(data.success){
					toast.success(data.success)
				}
			})
	}
	const role = session.data?.user?.role
	const apiRouteClick = () =>{
		fetch('/api/admin')
			.then((response) => {
				if(response.ok){
					toast.success('Allowed api route')
					
				}else[
					toast.error("Forbidden api route")
				]
				
			})
	}
	
		return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					Admin
				</p>
			</CardHeader>
			<CardContent className="">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message="Hello" />
				</RoleGate>
				<div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
					<p className="text-sm font-medium">
						Admin-only API Route
					</p>
					<Button onClick={apiRouteClick}>Click to test </Button>
				</div>
				<div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
					<p className="text-sm font-medium">
						Admin-only Server Action
					</p>
					<Button onClick={onServerActionClick} className="">Click to test </Button>
				</div>
				
			</CardContent>

		</Card>
	)
}
export default AdminPage