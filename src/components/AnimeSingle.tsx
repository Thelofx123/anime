"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "./ui/card"
import Link from "next/link"

export const AnimeSingle = ({ data }: any) => {
	return (
		<div className="w-full h-full ">
			<div>
				<Card className="w-fit">
					<CardContent>
						<Image
							src={"https://playmax.mn/" + data?.image}
							alt={data.title}
							objectFit="contain"
							width={300}
							height={250}
							priority
						/>
					</CardContent>
					<CardFooter className="flex justify-between flex-col">
						<Link
							href={
								data.vid1 === null
									? `/more/${data?.id}`
									: data.vid1
									? `/movie/${data.id}`
									: `/anime/${data.id}`
							}>
							<h1 className="font-bold">{data.title}</h1>
							<h1 className="">Episodes: {data.total_episode}</h1>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
