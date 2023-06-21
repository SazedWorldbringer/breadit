import { FC } from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SignUp from '@/components/sign-up';
import { Icons } from '@/components/icons';

const page: FC = ({ }) => {
	return (
		<div className='absolute inset-0'>
			<div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
				<Link
					href='/'
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'self-start -mt-20'
					)}
				>
					<Icons.back className='mr-2 h-4 w-4' />
					Home
				</Link>

				<SignUp />
			</div>
		</div>
	)
}

export default page
