"use client"
import {
	DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/user-current"
import { RxExit } from "react-icons/rx";
import { LogoutButton } from "./logout-button"

const UserButon = () => {
	const user = useCurrentUser();
	return (

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={user?.image || ""} />
						<AvatarFallback className="bg-red-400">
							<FaUser className="text-white" />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40 align-end">
						<LogoutButton>
							<DropdownMenuItem>
								<RxExit className="h-4 w-4 mr-2" />
								Logout
							</DropdownMenuItem>
						</LogoutButton>
				</DropdownMenuContent>
			</DropdownMenu>
	)
}

export default UserButon
