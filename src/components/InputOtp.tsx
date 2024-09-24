"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/use-toast"
import { checkUser } from "@/actions/checkUser"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
	id: z.string().optional(),
	status: z.string().optional(),
})

export function InputOTPForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			id: "",
			status: "NULL",
		},
	})

	const router = useRouter()

	const sendReset = async (data: any) => {
		const resetData = await checkUser(data)

		const toastJson = {
			phone: null,
			status: "",
		}

		if (resetData.status) {
			localStorage.setItem("userId", resetData?.data?.id)
			toastJson.phone = data
			toastJson.status = "Амжилттай"
			toast({
				title: "Та дараах утгуудыг оруулсан байна:",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{JSON.stringify(toastJson, null, 2)}
						</code>
					</pre>
				),
			})
			router.push("/list")
		} else {
			toastJson.phone = data
			toastJson.status = "Амжилтгүй"
			toast({
				title: "Та дараах утгуудыг оруулсан байна:",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">
							{JSON.stringify(toastJson, null, 2)}
						</code>
					</pre>
				),
			})
			form.resetField("id")
		}
	}

	function onSubmit(data: z.infer<typeof FormSchema>) {
		sendReset(data.id)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-fit space-y-6">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>PLAYMAX</FormLabel>
							<FormControl>
								<InputOTP
									maxLength={8}
									{...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
										<InputOTPSlot index={6} />
										<InputOTPSlot index={7} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>PLAYMAX PHONE NUMBER</FormDescription>
							<FormDescription>
								Энэ функцийг ашиглах үед таны нууц үг автоматаар 1111
								болно!!!
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="text-[#fff]">
					Нэвтрэх
				</Button>
			</form>
		</Form>
	)
}
