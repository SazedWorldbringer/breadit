'use client'

import { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { PostCreationRequest, PostValidator } from '@/lib/validators/post';

interface editorProps {
	subredditId: string
}

const Editor: FC<editorProps> = ({ subredditId }) => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PostCreationRequest>({
		resolver: zodResolver(PostValidator),
		defaultValues: {
			subredditId,
			title: '',
			content: null
		},
	})

	return (
		<div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
			<form
				id='subreddit-post-form'
				className='w-fit'
				onSubmit={() => { }}
			>
				<div className='prose prose-stone dark:prose-invert'>
					<TextareaAutosize
						placeholder='title'
						className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
					/>
				</div>
			</form>
		</div>
	)
}

export default Editor
