"use client";

import Image from "next/image";
import Link from "next/link";
import InfoBar from "./InfoBar";

interface AnimeDetailProps {
  data: any;
}

export const AnimeDetail = ({ data }: AnimeDetailProps) => {
  return (
    <div className="relative w-full h-[60vh] bg-[#161616]">
      <div className="w-full absolute h-[90%] z-[20] bg-[linear-gradient(40deg,_rgb(22,22,22)_24%,rgba(6,10,23,0)_57%),linear-gradient(0deg,_rgb(22,22,22)_4%,rgba(6,10,23,0)_69%)]"></div>

      <div className="absolute inset-0 z-0 h-[90%]">
        <Image
          src={`https://playmax.mn${data?.image1 || data?.image}`}
          alt={data?.title}
          layout="fill"
          objectFit="cover"
          priority
          className=" object-top"
        />
      </div>

      <div className="relative z-[30] px-[20px] pt-40 text-white max-w-5xl h-[90%] flex flex-col justify-end">
        <h1 className="text-6xl font-extrabold">{data?.original_name}</h1>
        {/* <p
          className="mt-4 text-lg max-w-3xl"
          dangerouslySetInnerHTML={{ __html: data?.shortdescription }}
        /> */}

        <div className="flex space-x-4 mt-6">
          <Link href={`/anime/${data?.id}`}>
            <button className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 text-lg">
              ▶ Watch Now
            </button>
          </Link>
        </div>
      </div>
      <div className="p-[20px]">
        <InfoBar
          year={data.released_date}
          ageRating={data?.age_limit}
          type={data?.total_episode > 1 ? "Anime" : "Movie"}
          genre={`${data?.bases} based`}
        />
      </div>
    </div>
  );
};
