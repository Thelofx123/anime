import axios from "axios";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getContentType(url: string): string {
  const extension = url.split(".").pop();
  const contentTypes: { [key: string]: string } = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    m3u8: "application/vnd.apple.mpegurl",
    max: "application/octet-stream",
  };
  return contentTypes[extension || "mp4"] || "application/octet-stream";
}

export async function GET(request: NextRequest) {
  try {
    // Get video URL from query params
    const videoURL = request.nextUrl.searchParams.get("videoUrl");
    console.log(videoURL, "videoURL");
    if (!videoURL) {
      throw new Error("WTF");
    }

    const range = request.headers.get("range") || "";
    const contentType = getContentType(videoURL);

    // Handle HLS (.m3u8) Streaming
    if (contentType === "application/vnd.apple.mpegurl") {
      const response = await axios({
        method: "get",
        url: videoURL,
        headers: {
          Referer: "https://playmax.mn/",
        },
        responseType: "stream",
      });

      const { data, headers } = response;

      const responseHeaders = {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      };

      return new NextResponse(data, {
        status: 200,
        headers: new Headers(responseHeaders),
      });
    }

    // Handle Direct Video Streaming (.mp4, .webm, .ogg)
    const axiosResponse = await axios({
      method: "get",
      url: videoURL,
      headers: {
        Range: range,
        Referer: "https://playmax.mn/",
      },
      responseType: "stream",
    });

    const { data, headers } = axiosResponse;

    const responseHeaders = {
      "Content-Type": contentType,
      "Content-Length": headers["content-length"],
      "Content-Range": headers["content-range"],
      "Accept-Ranges": headers["accept-ranges"],
      "Cache-Control": "no-cache",
    };

    // Remove undefined headers
    const filteredHeaders: any = Object.fromEntries(
      Object.entries(responseHeaders).filter(([, value]) => value !== undefined)
    );

    return new NextResponse(data, {
      status: 206,
      headers: new Headers(filteredHeaders),
    });
  } catch (error) {
    console.error("Error streaming video:", error);
    return new NextResponse("Error streaming video", { status: 500 });
  }
}
