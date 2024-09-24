"use client"
import Hls from "hls.js"
import DPlayer, { DPlayerOptions } from "dplayer"
import { useRef, useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { getAnime, getAnimeList } from "@/actions/anime"

function transformURL(url: string): string {
	if (url.endsWith(".max")) {
		const baseUrl = url.slice(0, -4)
		return `${baseUrl}.m3u8`
		// return `/api/proxy?url=${`${baseUrl}.m3u8`}`
		// const videoApiUrl = `/api/video?url480=${baseUrl || ""}&url720=${
		// 	baseUrl || ""
		// }&url1080=${baseUrl || ""}&preferredResolution=1080`
		// return videoApiUrl
	}

	const videoApiUrl = `/api/video?url480=${url || ""}&url720=${
		url || ""
	}&url1080=${url || ""}&preferredResolution=1080`
	return videoApiUrl
}

function determineType(url: string): string {
	if (
		/m3u8(#|\?|$)/i.exec(url) ||
		/max(#|\?|$)/i.exec(url) ||
		/wmx(#|\?|$)/i.exec(url)
	) {
		return "customHls"
	} else if (/.flv(#|\?|$)/i.exec(url)) {
		return "flv"
	} else if (/.mpd(#|\?|$)/i.exec(url)) {
		return "dash"
	} else {
		return "normal"
	}
}

const initPlayer = (
	videoApiUrl: string,
	playerContainerRef: React.RefObject<HTMLDivElement>,
	data: any,
	realUrl: any,
	subtitle: any
) => {
	if (playerContainerRef.current && subtitle !== null) {
		const dp = new DPlayer({
			container: playerContainerRef.current,
			lang: "mn",
			screenshot: true,
			hotkey: true,
			preload: "auto",
			video: {
				url: videoApiUrl,
				type: determineType(videoApiUrl),
				customType: {
					customHls: (video: any, player: any) => {
						if (Hls.isSupported()) {
							const hls = new Hls()
							hls.loadSource(videoApiUrl)
							hls.attachMedia(video)
							hls.on(Hls.Events.MANIFEST_PARSED, () => {
								video.play()
							})

							hls.on(Hls.Events.ERROR, (event, data) => {
								if (data.fatal) {
									switch (data.type) {
										case Hls.ErrorTypes.NETWORK_ERROR:
											hls.startLoad()
											break
										case Hls.ErrorTypes.MEDIA_ERROR:
											hls.recoverMediaError()
											break
										default:
											hls.destroy()
											break
									}
								}
							})

							player.on("destroy", () => {
								hls.destroy()
							})
						} else if (
							video.canPlayType("application/vnd.apple.mpegurl")
						) {
							video.src = videoApiUrl
							video.addEventListener("loadedmetadata", () => {
								video.play()
							})
						} else {
							player.notice("Error: HLS is not supported.")
						}
					},
				},
				pic: `https://playmax.mn/${data?.image || ""}`,
				thumbnails: `https://playmax.mn/${data?.v_thumb || ""}`,
			},
			subtitle: {
				url: `data:text/vtt;charset=utf-8,${encodeURIComponent(subtitle)}`,
				type: "webvtt",
				fontSize: "30px",
				bottom: "15%",
				color: "#fff",
			},
			headers: {
				referrer: "https://playmax.mn/",
				"Accept-Language": "mn-MN,mn;q=0.9,en-US;q=0.8,en;q=0.7",
				referrerPolicy: "origin-when-cross-origin",
			},
		} as DPlayerOptions)

		console.log(dp, "dp")
	} else {
		console.warn("Subtitle is null or player container is not available.")
	}
}

const PlayerComponent = ({ data, episodes }: { data: any; episodes: any }) => {
	const [mainData, setMainData] = useState<any>(data)
	const [subtitle, setSubtitle] = useState<any>(null)
	const [episodeData, setEpisodeData] = useState<any>(null)
	const [isLoading, setIsloading] = useState<any>(false)

	const fetchEpisodes2 = async () => {
		if (episodes === null) return
		const episodes1 = await getAnimeList(episodes)

		setEpisodeData(episodes1)
	}

	useEffect(() => {
		fetchEpisodes2()
	}, [])

	const getSub = async () => {
		setIsloading(true)
		const sda = await axios.post("/api/convert", {
			subUrl: mainData?.sub_url,
		})
		setSubtitle(sda?.data)
		setIsloading(false)
	}

	useEffect(() => {
		getSub()
	}, [mainData])

	const playerContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const videoApiUrl = transformURL(
			mainData?.vid3 || mainData?.vid2 || mainData?.vid1 || ""
		)

		const realUrl = mainData?.vid3 || mainData?.vid2 || mainData?.vid1 || ""
		if (subtitle !== null) {
			initPlayer(
				videoApiUrl,
				playerContainerRef,
				mainData,
				realUrl,
				subtitle
			)
		}
	}, [subtitle])

	const handleEpisodeClick = async (episode: any) => {
		const animeData = await getAnime(episode)

		setMainData(animeData)
	}

	return (
		<div className="w-full h-screen flex bg-[#121821] relative">
			<div
				ref={playerContainerRef}
				className="w-fit h-screen"></div>
			<div className="w-[400px] h-full p-20 relative">
				<div className="w-full rounded-md relative">
					<Image
						src={"https://playmax.mn/" + data?.image}
						alt={data?.title}
						objectFit="contain"
						width={300}
						height={250}
						quality={100}
						priority
						className="rounded-md"
					/>
					<p className="py-20 text-20">
						{data?.atitle || data?.original_name}
					</p>
				</div>
				<div className=" flex flex-wrap gap-10  overflow-hidden overflow-y-scroll py-10">
					{episodeData &&
						episodeData?.map((episode: any) => {
							return (
								<div
									className={`flex p-10 h-[60px] items-center justify-center  text-[#e5e5d8] min-w-[60px] rounded-lg cursor-pointer ${
										mainData?.id == episode?.id
											? "bg-[#e92424]"
											: "bg-[#1f2939]"
									}`}
									onClick={() => handleEpisodeClick(episode?.id)}>
									<p>{episode?.number}</p>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default PlayerComponent
