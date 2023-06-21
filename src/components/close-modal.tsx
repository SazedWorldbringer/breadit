'use client'

import { useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

const CloseModal = () => {
	const router = useRouter()

	const handleClose = () => {
		router.back()
	}

	return (
		<Button onClick={handleClose} variant='ghost'>
			<Icons.x className="mx-auto h-6 w-6" />
		</Button>
	)
}

export default CloseModal
