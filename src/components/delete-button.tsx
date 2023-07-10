'use client'

import { useCustomToast } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { FC } from 'react';

interface DeleteButtonProps {
	postId: String
	subredditTitle: String | undefined
}

const DeleteButton: FC<DeleteButtonProps> = ({ postId, subredditTitle }) => {
	const router = useRouter();
	const { loginToast } = useCustomToast();

	const { mutate: deletePost, isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await axios.delete(`/api/subreddit/post/delete?postId=${postId}`)
			return data
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast()
				}
			}

			toast({
				title: 'Uh oh! Something went wrong.',
				description: 'There was an error deleting your post. Please try again later.',
				variant: 'destructive',
			})
		},
		onSuccess: () => {
			toast({
				description: 'Your post has been deleted.',
			})
			router.push(`/r/${subredditTitle}`)
		}
	})

	return (
		<Button
			className='mt4'
			isLoading={isLoading}
			onClick={() => deletePost()}
		>
			Delete post
		</Button>
	)
}

export default DeleteButton
