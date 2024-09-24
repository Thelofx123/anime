"use client"

import { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"

import { AnimeSingle } from "./AnimeSingle"

export const HomePage: any = () => {
	const [paginatedData, setPaginatedData] = useState<any>([])
	const [inputValue, setInputValue] = useState<string>("")

	return (
		<div className="">
			<SearchBar
				setPaginatedData={setPaginatedData}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
			<div className="px-[20px] items-center  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full h-full overflow-x-auto  flex-wrap pt-[30px]">
				{paginatedData.length > 0 &&
					paginatedData.map((data: any) => {
						return <AnimeSingle data={data} />
					})}
			</div>
		</div>
	)
}
