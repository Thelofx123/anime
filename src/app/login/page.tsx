"use client"
import { InputOTPForm } from "@/components/InputOtp"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Index() {
	const router = useRouter()

	return (
		<div className="space-y-6 flex w-screen h-screen items-center justify-center relative">
			<div className="absolute top-20 left-20">
				<Button
					variant="outline"
					onClick={() => {
						router.back()
					}}>
					BACK
				</Button>
			</div>
			<InputOTPForm />
		</div>
	)
}
