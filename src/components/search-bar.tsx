'use client'

import { FC, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Prisma, Subreddit } from '@prisma/client';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Icons } from './icons';

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = ({ }) => {
	const [input, setInput] = useState<string>('');
	const router = useRouter()

	const {
		data: queryResults,
		refetch,
		isFetched,
		isFetching
	} = useQuery({
		queryFn: async () => {
			if (!input) return [];
			const { data } = await axios.get(`/api/search?q=${input}`);
			return data as (Subreddit & {
				_count: Prisma.SubredditCountOutputType;
			})[];
		},
	});

	// debounce the fetch request so we don't spam the database with requests
	const request = debounce(() => {
		refetch()
	}, 300)

	const debounceRequest = useCallback(() => {
		request()
	}, [])

	return (
		<Command className='relative rounded-lg border max-w-lg z-50 overflow-visible'>
			<CommandInput
				value={input}
				onValueChange={(text) => {
					setInput(text)
					debounceRequest()
				}}
				className='outline-none border-none focus:border-none focus:outline-none ring-0'
				placeholder='Search communities...'
			/>

			{input.length > 0 && (
				<CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
					{isFetched && <CommandEmpty>No results found.</CommandEmpty>}
					{(queryResults?.length ?? 0) > 0 && (
						<CommandGroup heading='Communities'>
							{queryResults?.map((subreddit) => (
								<CommandItem
									onSelect={(e) => {
										router.push(`/r/${e}`)
										router.refresh()
									}}
									key={subreddit.id}
									value={subreddit.name}
								>
									<Icons.users className='mr-2 h-4 w-4' />
									<a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			)}
		</Command>
	)
}

export default SearchBar