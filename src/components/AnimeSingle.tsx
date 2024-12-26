"use client";

import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps {
  data: {
    id: string;
    title: string;
    image: string;
    total_episode: number;
    vid1?: string | null;
  };
}

export const AnimeSingle = ({ data }: AnimeCardProps) => {
  console.log(data, "data");
  return (
    <div className="relative w-full ">
      <div className="flex justify-center relative hover:z-[210] z-0">
        <div className=" relative group-hover:z-[210]  w-full h-[350px] rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <Link
            href={
              data.vid1 === null
                ? `/more/${data?.id}`
                : data.vid1
                ? `/movie/${data.id}`
                : `/anime/${data.id}`
            }
            key={data?.id}
          >
            <Image
              src={`https://playmax.mn/${data?.image}`}
              alt={data?.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:brightness-75 transition-all group-hover:z-[210]"
              loading="lazy"
            />
            <div className="hidden group-hover:absolute group-hover:flex inset-0 group-hover:z-[210] transition-all duration-300 ease-in-out group-hover:brightness-[300]  items-end bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white text-lg font-bold drop-shadow-2xl">
                {data?.title}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
