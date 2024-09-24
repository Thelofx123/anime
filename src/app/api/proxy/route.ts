import { NextRequest, NextResponse } from "next/server"
import fetch from "node-fetch"

export async function GET(request: NextRequest) {
	const url = request.nextUrl.searchParams.get("url")

	if (!url) {
		return new NextResponse("No appropriate video URL provided", {
			status: 400,
		})
	}

	try {
		const m3u8Response = await fetch(url, {
			headers: {
				Referer: "https://playmax.mn/",
			},
		})

		if (!m3u8Response.ok) {
			throw new Error(
				`Failed to fetch the playlist: ${m3u8Response.statusText}`
			)
		}

		const m3u8Text = await m3u8Response.text()
		const lines = m3u8Text.split("\n")
		const segmentUrls = lines.filter((line: any) => line.endsWith(".ts"))

		const stream = new ReadableStream({
			async start(controller) {
				for (const segment of segmentUrls) {
					const segmentUrl = `${url.substring(
						0,
						url.lastIndexOf("/")
					)}/${segment}`
					console.log(`Fetching segment: ${segmentUrl}`)

					try {
						const segmentResponse = await fetch(segmentUrl, {
							headers: {
								Referer: "https://playmax.mn/",
							},
						})

						if (!segmentResponse.ok) {
							throw new Error(`Failed to fetch segment: ${segmentUrl}`)
						}

						// const reader = segmentResponse.body?.getReader()

						// while (true) {
						// 	const { done, value } = await reader?.read()!
						// 	if (done) break
						// 	controller.enqueue(value)
						// }
					} catch (error) {
						console.error("Error fetching segment:", segment, error)
						controller.error(error)
						return
					}
				}
				controller.close()
			},
		})

		return new NextResponse(stream, {
			status: 200,
			headers: {
				"Content-Type": "video/MP2T",
				"Cache-Control": "no-cache",
			},
		})
	} catch (error) {
		console.error("Error proxying video:", error)
		return new NextResponse("Error proxying video", { status: 500 })
	}
}
