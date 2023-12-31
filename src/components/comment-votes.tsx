'use client'

import { FC, useState } from 'react';
import { usePrevious } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { Button } from '@/components/ui/button';
import { CommentVote, VoteType } from '@prisma/client';
import { CommentVoteRequest } from '@/lib/validators/vote';
import { toast } from '@/hooks/use-toast';

type PartialVote = Pick<CommentVote, 'type'>

interface CommentVotesProps {
	commentId: string
	initialVotesAmt: number
	initialVote?: PartialVote | null
}

const CommentVotes: FC<CommentVotesProps> = ({
	commentId,
	initialVotesAmt,
	initialVote
}) => {
	const { loginToast } = useCustomToast()
	const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
	const [currentVote, setCurrentVote] = useState(initialVote)
	const prevVote = usePrevious(currentVote)

	const { mutate: vote } = useMutation({
		mutationFn: async (voteType: VoteType) => {
			const payload: CommentVoteRequest = {
				commentId,
				voteType,
			}

			await axios.patch('/api/subreddit/post/comment/vote', payload)
		},
		onError: (err, voteType) => {
			if (voteType === 'UP') setVotesAmt((prev) => prev - 1)
			else setVotesAmt((prev) => prev + 1)

			// reset current vote
			setCurrentVote(prevVote)

			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast()
				}
			}

			return toast({
				title: 'Uh-oh! Something went wrong.',
				description: 'Your vote was not registered. Please try again.',
				variant: 'destructive'
			})
		},
		// optimistic updates (giving visual indication of change right away)
		onMutate: (type) => {
			// if the same vote is cast, remove the vote
			if (currentVote?.type === type) {
				setCurrentVote(undefined)

				if (type === 'UP') setVotesAmt((prev) => prev - 1)
				else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)

			} else {
				// handle opposite votes being cast
				setCurrentVote({ type })

				if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
				else if (type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1))

			}
		},
	})

	return (
		<div className='flex gap-1'>
			<Button
				onClick={() => vote('UP')}
				size='sm'
				variant='ghost'
				aria-label='upvote'
			>
				<Icons.upvote className={cn('h-5 w-5 text-zinc-700',
					{
						'text-emerald-500 fill-emerald-500': currentVote?.type == 'UP'
					})} />
			</Button>

			<p className='text-center py-2 font-medium text-sm text-zinc-900'>
				{votesAmt}
			</p>

			<Button
				onClick={() => vote('DOWN')}
				size='sm'
				variant='ghost'
				aria-label='downvote'
			>
				<Icons.downvote className={cn('h-5 w-5 text-zinc-700',
					{
						'text-red-500 fill-red-500': currentVote?.type == 'DOWN'
					})} />
			</Button>
		</div>
	)
}

export default CommentVotes
