import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 })
		}

		const url = new URL(req.url);
		const postId = url.searchParams.get('postId');

		if (!postId) return new Response('Invalid query', { status: 400 });

		// verify if the user is the post author
		const isAuthor = await db.post.findFirst({
			where: {
				author: session.user,
				id: postId
			}
		})

		if (!isAuthor) {
			return new Response('You are not the post author', { status: 403 })
		}

		// delete all comments under the post
		await db.comment.deleteMany({
			where: {
				postId: postId,
			}
		})

		// delete the post
		await db.post.delete({
			where: {
				id: postId,
			}
		})

		return new Response('OK')
	} catch (error: any) {
		return new Response(error.message, { status: 500 });
	}
}
