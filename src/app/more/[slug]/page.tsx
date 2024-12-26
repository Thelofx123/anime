import { animeMeta, getAnimeList } from "@/actions/anime";
import { AnimeDetail } from "@/components/AnimeDetail";
import { MoreAnime } from "@/components/MoreAnime";

const fetchAnime = async (id: any) => {
  const data = getAnimeList(id);
  return data;
};

const fetchMetaData = async (id: any) => {
  const data = animeMeta(id);
  return data;
};

export default async function AnimeDetailPage({ params }: any) {
  //   const data = await fetchAnime(params?.slug);

  const [data, metaData]: any = await Promise.all([
    fetchAnime(params?.slug),
    fetchMetaData(params?.slug),
  ]);

  return (
    <div className="">
      <AnimeDetail data={metaData} />
      <MoreAnime data={data} />
    </div>
  );
}
