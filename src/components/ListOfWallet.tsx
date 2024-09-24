"use client"
import { BellIcon, CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { DrawerDemo } from "./Qpay"
import { useState } from "react"
import { checkout } from "@/actions/checkout"
import { useRouter } from "next/navigation"

export function ListOfWallet({ className, data }: any) {
	const [selectedList, setSelectedList] = useState<any>(null)
	const [qpayData, setQpayData] = useState<any>(null)
	const [open, setOpen] = useState(false)
	const [bill, setBill] = useState<any>(null)
	const router = useRouter()

	const checkoutGenerate = async (item: any) => {
		const id = localStorage.getItem("userId")

		if (id === null) {
			alert("Та эхлээд нэвтэрнэ үү")
			router.push("/login")
		}
		setSelectedList(item)
		if (item.id === undefined) return
		const data = await checkout(id, item?.id)
		setQpayData(data?.data)
		setBill(data?.bill)
		setOpen(true)
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4 gap-[20px]">
			{data &&
				data.map((item: any, index: number) => {
					return (
						<Card className="w-max-[380px] border-[##111111] border-[1px]">
							<CardHeader>
								<CardTitle>{item?.title}</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="flex gap-4 items-center">
									<CheckCircledIcon />
									Анимэ багц
								</div>
								<div className="flex gap-4 items-center">
									<CheckCircledIcon />
									Кино багц
								</div>

								<div
									key={index}
									className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
									<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
									<div className="space-y-1">
										<p className="text-sm font-medium leading-none">
											Хоног - {item?.length} өдөр
										</p>
										<p className="text-sm text-muted-foreground">
											Үнэ - {item?.price}
										</p>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full border-[1px] border-[#111] "
									variant="outline"
									onClick={() => {
										checkoutGenerate(item)
									}}>
									<p className="text-[#000]">Худалдан авах</p>
								</Button>
							</CardFooter>
						</Card>
					)
				})}

			<DrawerDemo
				qpayData={qpayData}
				data={selectedList}
				open={open}
				setOpen={setOpen}
				setQpayData={setQpayData}
				bill={bill}
			/>
		</div>
	)
}
