import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export const useCustomToast = () => {
	const loginToast = () => {
		const { update, dismiss } = toast({
			title: 'Login required.',
			description: 'You need to be logged in to do that.',
			variant: 'destructive',
			action: (
				<Link
					href='/sign-in'
					onClick={() => dismiss()}
					className={buttonVariants({ variant: "outline" })}
				>
					Login
				</Link>
			)
		})
	}

	return { loginToast }
}
