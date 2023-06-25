'use client'

import { FC, startTransition } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'

interface SubscribeLeaveToggleProps {
	subredditId: string
	subredditName: string
	isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
	subredditId,
	subredditName,
	isSubscribed
}) => {
	const { loginToast } = useCustomToast()
	const router = useRouter()

	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToSubredditPayload = {
				subredditId: subredditId
			}

			const { data } = await axios.post('/api/subreddit/subscribe', payload)
			return data as string
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast()
				}
			}

			return toast({
				title: 'Uh oh! Something went wrong.',
				description: 'There was an error. Please try again.',
				variant: 'destructive',
			})
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh()
			})

			return toast({
				title: 'Subscribed',
				description: `You are now subscribed to ${subredditName}`
			})
		},
	})

	return isSubscribed ? (
		<Button className='w-full mt-1 mb-4'>Leave community</Button>
	) : (
		<Button
			className='w-full mt-1 mb-4'
			onClick={() => subscribe()}
			isLoading={isSubLoading}
		>
			Join to post
		</Button>
	)
}

export default SubscribeLeaveToggle
