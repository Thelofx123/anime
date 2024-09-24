import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	buyMonthsFromWallet,
	checkCheckout,
	checkout,
} from "@/actions/checkout"
import { useEffect, useState, useTransition } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const CustomQr = dynamic(() => import("./CustomQr"), {
	ssr: false,
})

export function DrawerDemo({
	data,
	open,
	setOpen,
	qpayData,
	setQpayData,
	bill,
}: any) {
	const [msg, setMsg] = useState<any>(null)
	const [status, setStatus] = useState<any>(null)
	const [isPending, startTransition] = useTransition()
	const check = async () => {
		startTransition(async () => {
			const id = localStorage.getItem("userId")
			const response = await checkCheckout(bill)

			if (response?.status == 1) {
				const res = await buyMonthsFromWallet(id, data?.id)
				if (res?.status) {
					setStatus(res?.status)
					setMsg(res?.msg)
					setOpen(false)
				}
			} else {
				setStatus(response?.status)
				setMsg("Төлбөр төлөгдөөгүй байна")
			}
		})
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>{data?.title}</DrawerTitle>
						<DrawerDescription>
							{data?.length} - {data?.price}₮
						</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="flex items-center justify-center space-x-2">
							{qpayData?.qr_text && (
								<CustomQr
									qrCodeData={qpayData?.qr_text || "test"}
									id="qrcode-canvas"
									qrCodeSize={200}
								/>
							)}
						</div>
						<div className="w-full">
							{msg && status && (
								<>
									<p
										className={`${
											status == 1
												? "text-[#95d5b2]"
												: "text-[#c71f37]"
										}`}>
										{status === 1
											? "Төлбөр төлөгдсөн байна"
											: "Төлбөр төлөгдөөгүй байна"}
									</p>
									{/* <p className="text-[#081c15]">{msg}</p> */}
								</>
							)}
						</div>
					</div>
					<DrawerFooter>
						<Button
							className=""
							variant="outline"
							onClick={() => {
								check()
							}}
							disabled={isPending}>
							{isPending ? (
								<Loader2 className="animate-spin" />
							) : (
								"Төлбөр шалгах"
							)}
						</Button>
						<DrawerClose asChild>
							<Button variant="outline">Болих</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
