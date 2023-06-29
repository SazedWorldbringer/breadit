'use client'

import { useCustomToast } from '@/hooks/use-custom-toast';
import { usePrevious } from '@mantine/hooks';
import { VoteType } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';

interface PostVoteClientProps {
	postId: string
	initialVotesAmt: number
	initialVote?: VoteType | null
}

const PostVoteClient: FC<PostVoteClientProps> = ({
	postId,
	initialVotesAmt,
	initialVote
}) => {
	const { loginToast } = useCustomToast()
	const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
	const [currentVote, setCurrentVote] = useState(initialVote)
	const prevVote = usePrevious(currentVote)

	useEffect(() => {
		setCurrentVote(initialVote)
	}, [initialVote])

	return (
		<div className='flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
			<Button size='sm' variant='ghost' aria-label='upvote'>
				<Icons.upvote className={cn('h-5 w-5 text-zinc-700',
					{
						'text-emerald-500 fill-emerald-500': currentVote == 'UP'
					})} />
			</Button>

			<p className='text-center py-2 font-medium text-sm text-zinc-900'>
				{votesAmt}
			</p>

			<Button size='sm' variant='ghost' aria-label='downvote'>
				<Icons.downvote className={cn('h-5 w-5 text-zinc-700',
					{
						'text-red-500 fill-red-500': currentVote == 'DOWN'
					})} />
			</Button>
		</div>
	)
}

export default PostVoteClient
