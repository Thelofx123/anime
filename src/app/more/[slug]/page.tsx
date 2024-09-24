import { getAnimeList } from "@/actions/anime"
import { MoreAnime } from "@/components/MoreAnime"

const fetchAnime = async (id: any) => {
	const data = getAnimeList(id)
	return data
}
export default async function AnimeDetailPage({ params }: any) {
	const data = await fetchAnime(params?.slug)
	console.log(data, "data")
	return (
		<div className="">
			<MoreAnime data={data} />
		</div>
	)
}
