'use client'

import { FC } from 'react'
import { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'

import UserAvatar from '@/components/user-avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from "@/components/icons";

interface MiniCreatePostProps {
	session: Session | null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<li className='overflow-hidden rounded-md bg-white shadow list-none'>
			<div className='h-full px-6 py-4 flex justify-between gap-6'>
				<div className='relative'>
					<UserAvatar user={{
						name: session?.user.name || null,
						image: session?.user.image || null,
					}}
					/>

					<span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white' />
				</div>

				<Input
					readOnly
					onClick={() => router.push(pathname + '/submit')}
					placeholder='Create post'
				/>

				<Button
					onClick={() => router.push(pathname + '/submit')}
					variant='ghost'
				>
					<Icons.image className="h-4 w-4" />
				</Button>

				<Button
					onClick={() => router.push(pathname + '/submit')}
					variant='ghost'
				>
					<Icons.link className="h-4 w-4" />
				</Button>
			</div>
		</li>
	)
}

export default MiniCreatePost
