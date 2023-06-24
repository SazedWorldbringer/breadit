'use client'

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import { useToast } from '@/hooks/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()

	const loginWithgoogle = async () => {
		setIsLoading(true)

		try {
			await signIn('google')
		} catch (error) {
			toast({
				title: 'Uh oh! Something went wrong.',
				description: 'There was an error logging in with Google.',
				variant: 'destructive'
			})
		} finally {
			setIsLoading(false)
		}
	}


	return (
		<div className={cn(
			'flex justify-center',
			className
		)}
			{...props}
		>
			<Button
				size='sm'
				className='w-full'
				onClick={loginWithgoogle}
				isLoading={isLoading}
			>
				{isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
				Google
			</Button>
		</div>
	)
}

export default UserAuthForm
