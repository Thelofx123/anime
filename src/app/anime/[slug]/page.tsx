import { getAnime, getAnimeList, getMovie } from "@/actions/anime";

import VideoPlayerComponent from "@/components/VideoPlayer";

const fetchAnime = async (id: any) => {
  try {
    const animeData = await getAnime(id);
    return animeData;
  } catch (error) {}
};

export default async function AnimeDetailPage({ params }: any) {
  const data = await fetchAnime(params?.slug);

  return (
    <div className="">
      <VideoPlayerComponent
        data={data}
        episodes={data?.anime_id}
        isMovie={false}
      />
    </div>
  );
}
