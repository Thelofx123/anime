import { getAnime, getMovie } from "@/actions/anime"

import VideoPlayerComponent from "@/components/VideoPlayer"

const fetchAnime = async (id: any) => {
	try {
		const movieData = await getMovie(id)
		return movieData
	} catch (movieError) {
		console.error("Failed to fetch movie data:", movieError)
		throw new Error("Failed to fetch both anime and movie data")
	}
}
export default async function AnimeDetailPage({ params }: any) {
	const data = await fetchAnime(params?.slug)

	return (
		<div className="">
			<VideoPlayerComponent
				data={data}
				episodes={null}
			/>
		</div>
	)
}
