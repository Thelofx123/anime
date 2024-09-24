import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		console.log(props.value, "props")
		return (
			<input
				type={type}
				className={cn(
					`flex  w-[80%]  bg-[#121212]  text-sm  text-[#636363] file:text-sm file:font-medium outline-none ${
						props.value ? "text-[#f1f1f1]" : "text-[#636363]"
					}`,
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = "Input"

export { Input }
