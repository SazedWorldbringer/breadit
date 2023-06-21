import Link from 'next/link'

import { Icons } from '@/components/icons'
import UserAuthForm from '@/components/user-auth-form'

const SignUp = ({ }) => {
	return (
		<div className='container mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[400px]'>
			<div className='flex flex-col space-y-2 text-center'>
				<Icons.logo className='mx-auto h-6 w-6' />
				<h1 className='text-2xl font-semibold tracking-tight'>
					Welcome back!
				</h1>
				<p className='text-sm max-w-xs mx-auto'>
					By continuing, you are setting up a Breadit account and agreeing to our User Agreement and Privacy Policy
				</p>

				<UserAuthForm />

				<p className='px-8 text-center text-sm text-zinc-700'>
					Already a Breaditter?{' '}
					<Link href='/sign-in' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUp
