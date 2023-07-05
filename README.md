# Breadit

Modern Fullstack Reddit clone built using Next.js 13(app router), TypeScript and Tailwind.

## Getting Started

Clone the repository

    git clone https://github.com/SazedWorldbringer/breadit.git

Rename `.env.example` to `.env` and update with your own variables

    mv .env.example .env

## Features

- Authentication using NextAuth and Google 
- Data fetching using Tanstack query
- Prisma for data modeling
- Modern, beautifully designed components by shadcn-ui
- Infinite scrolling using useIntersection and useInfiniteQuery hooks from mantine and tanstack query
- Optimistic updates using tanstack query
- Dynamic caching and streaming of post data using redis
