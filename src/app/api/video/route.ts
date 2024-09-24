import axios from "axios"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

function getContentType(url: string): string {
	const extension = url.split(".").pop()
	const contentTypes: { [key: string]: string } = {
		mp4: "video/mp4",
		webm: "video/webm",
		ogg: "video/ogg",
		m3u8: "application/vnd.apple.mpegurl",
		max: "application/octet-stream",
	}
	return contentTypes[extension || "mp4"] || "application/octet-stream"
}

export async function GET(request: NextRequest) {
	try {
		const url480 = request.nextUrl.searchParams.get("url480")
		const url720 = request.nextUrl.searchParams.get("url720")
		const url1080 = request.nextUrl.searchParams.get("url1080")
		const preferredResolution = request.nextUrl.searchParams.get(
			"preferredResolution"
		)

		let videoURL = url1080 || url720 || url480
		if (preferredResolution === "480" && url480) {
			videoURL = url480
		} else if (preferredResolution === "720" && url720) {
			videoURL = url720
		} else if (preferredResolution === "1080" && url1080) {
			videoURL = url1080
		}

		if (!videoURL) {
			throw new Error("No appropriate video URL provided")
		}

		const range = request.headers.get("range") || ""
		const contentType = getContentType(videoURL)

		if (contentType === "application/vnd.apple.mpegurl") {
			const response = await axios({
				method: "get",
				url: videoURL,
				headers: {
					Referer: "https://playmax.mn/",
				},
				responseType: "stream",
			})

			const { data, headers } = response

			const responseHeaders = {
				"Content-Type": contentType,

				"Cache-Control": "no-cache",
			}

			return new NextResponse(data, {
				status: 200,
				headers: new Headers(responseHeaders),
			})
		} else if (contentType === "application/octet-stream") {
			const response = await axios({
				method: "get",
				url: videoURL,
				headers: {
					Range: range,
					Referer: "https://playmax.mn/",
				},
				responseType: "arraybuffer",
			})

			const blob = new Blob([response.data], {
				type: "application/octet-stream",
			})
			const blobStream = blob.stream()

			const responseHeaders = {
				"Content-Type": contentType,
				"Content-Length": response.headers["content-length"],
				"Content-Range": response.headers["content-range"],
				"Accept-Ranges": response.headers["accept-ranges"],
				"Cache-Control": "no-cache",
			}

			const filteredHeaders: any = Object.fromEntries(
				Object.entries(responseHeaders).filter(
					([, value]) => value !== undefined
				)
			)

			return new NextResponse(blobStream, {
				status: 206,
				headers: new Headers(filteredHeaders),
			})
		} else {
			const axiosResponse = await axios({
				method: "get",
				url: videoURL,
				headers: {
					Range: range,
					Referer: "https://playmax.mn/",
				},
				responseType: "stream",
			})

			const { data, headers } = axiosResponse

			const responseHeaders = {
				"Content-Type": contentType,
				"Content-Length": headers["content-length"],
				"Content-Range": headers["content-range"],
				"Accept-Ranges": headers["accept-ranges"],
				"Cache-Control": "no-cache",
			}

			const filteredHeaders: any = Object.fromEntries(
				Object.entries(responseHeaders).filter(
					([, value]) => value !== undefined
				)
			)

			return new NextResponse(data, {
				status: 206,
				headers: new Headers(filteredHeaders),
			})
		}
	} catch (error) {
		return new NextResponse("Error streaming video", { status: 500 })
	}
}
