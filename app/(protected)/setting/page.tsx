import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";
export const  SettingPage = async () => {
	const session = await auth();
	console.log(session?.user?.id);
	
	return (
		<>
		{JSON.stringify(session)}
		<form action={async () => {
			"use server"
			await	signOut()
		}}>
			<Button type="submit">Logout</Button>
		</form>
		</>
	)
}
export default SettingPage;