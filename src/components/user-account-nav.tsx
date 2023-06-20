'use client'

import { FC } from "react"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user-avatar"
import Link from "next/link"

interface UserAccountNavProps {
	user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
	const handleSignOut = (event: Event) => {
		event.preventDefault()
		signOut({
			callbackUrl: `${window.location.origin}/sign-in`
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					className="h-8 w-8"
					user={{
						name: user.name || null, image: user.image || null
					}}
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="bg-card" align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.name && <p className="font-medium">{user.name}</p>}
						{user.email && (
							<p className="w-[200px] truncate text-sm">{user.email}</p>
						)}
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href='/'>Feed</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href='/r/create'>Create community</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild>
					<Link href='/settings'>Settings</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="cursor-pointer"
					onSelect={handleSignOut}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAccountNav
