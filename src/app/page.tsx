"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Index() {
	const router = useRouter()

	return (
		<div className="w-full h-screen flex items-center justify-center gap-20">
			<Button
				variant="outline"
				className=""
				onClick={() => {
					router.push("/search")
				}}>
				Watch Anime
			</Button>
			<Button
				variant="outline"
				className=""
				onClick={() => {
					const id = localStorage?.getItem("userId") || ""
					if (id === null) {
						router.push("/login")
					} else {
						router.push("/list")
					}
				}}>
				Account Page
			</Button>
		</div>
	)
}
