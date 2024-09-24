import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	console.log(request, "request")
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Content-Type": "application/vnd.apple.mpegurl",
			Referer: "https://playmax.mn/",
		},
	})
}