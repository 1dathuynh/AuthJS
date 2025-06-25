import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserInfoProps{
	user?: user,
	label: string
}
interface user{
	name?: string | null;
  email?: string | null;
  image?: string | null;
	id?: string | null,
  role: "USER" | "ADMIN";
	isTwoFactorEnabled: boolean;
}
export const UserInfo = ({user, label} : UserInfoProps) => {
	return (
		<Card className="w-[600px] shadow-md">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					{label}
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex rounded-lg border p-3 shadow-sm flex-row items-center justify-between">
					<p className="text-sm font-medium">ID</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md">{user?.id}</p>
				</div>
				<div className="flex rounded-lg border p-3 shadow-sm flex-row items-center justify-between">
					<p className="text-sm font-medium">Name</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md">{user?.name}</p>
				</div>
				<div className="flex rounded-lg border p-3 shadow-sm flex-row items-center justify-between">
					<p className="text-sm font-medium">Email</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md">{user?.email}</p>
				</div>
				<div className="flex rounded-lg border p-3 shadow-sm flex-row items-center justify-between">
					<p className="text-sm font-medium">Role</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md">{user?.role}</p>
				</div>
				<div className="flex rounded-lg border p-3 shadow-sm flex-row items-center justify-between">
					<p className="text-sm font-medium">Two Factor Authentication</p>
					<Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
						{user?.isTwoFactorEnabled ? "ON" : 'OFF'}
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}