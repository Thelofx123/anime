"use client";
import Hls from "hls.js";
import DPlayer, { DPlayerOptions } from "dplayer";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { getAnime, getAnimeList } from "@/actions/anime";
import Link from "next/link";

const COUNTDOWN_DURATION = 5;

function transformURL(url: string): string {
  if (url.endsWith(".max")) {
    const baseUrl = url.slice(0, -4);
    return `${baseUrl}.mp4`;
  }
  const videoApiUrl = `/api/video?videoUrl=${url || ""}`;
  return videoApiUrl;
}

function determineType(url: string): string {
  if (
    /m3u8(#|\?|$)/i.exec(url) ||
    /max(#|\?|$)/i.exec(url) ||
    /wmx(#|\?|$)/i.exec(url)
  ) {
    return "customHls";
  } else if (/.flv(#|\?|$)/i.exec(url)) {
    return "flv";
  } else if (/.mpd(#|\?|$)/i.exec(url)) {
    return "dash";
  } else {
    return "normal";
  }
}

const initPlayer = (
  videoApiUrl: string,
  playerContainerRef: React.RefObject<HTMLDivElement>,
  data: any,
  subtitle: any,
  handleEnd: () => void,
  triggerCountdown: () => void
) => {
  let quality = [
    data?.vid3 && {
      name: "1080p",
      url: transformURL(data?.vid3 || ""),
      type: determineType(transformURL(data?.vid3 || "")),
    },
    data?.vid2 && {
      name: "720p",
      url: transformURL(data?.vid2 || ""),
      type: determineType(transformURL(data?.vid2 || "")),
    },
    data?.vid1 && {
      name: "480p",
      url: transformURL(data?.vid1 || ""),
      type: determineType(transformURL(data?.vid1 || "")),
    },
  ].filter(Boolean);

  console.log(quality, "quality");
  if (playerContainerRef.current) {
    const dp = new DPlayer({
      container: playerContainerRef.current,
      lang: "mn",
      screenshot: false,
      hotkey: true,
      autoplay: true,
      theme: "#e50914",
      preload: "auto",
      video: {
        quality: quality,
        defaultQuality: data?.vid3 ? 0 : data?.vid2 ? 1 : 2,
        pic: `https://playmax.mn/${data?.image || ""}`,
        customType: {
          customHls: (video: any) => {
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(videoApiUrl);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
            }
          },
        },
      },
      subtitle: {
        url: subtitle
          ? `data:text/vtt;charset=utf-8,${encodeURIComponent(subtitle)}`
          : "",
        type: "webvtt",
        fontSize: "30px",
        bottom: "10%",
        color: "#fff",
      },
    } as unknown as DPlayerOptions);

    setTimeout(() => {
      const subtitleContainer = document.querySelector(
        ".dplayer-subtitle"
      ) as HTMLElement;

      const videoWrap = playerContainerRef.current?.querySelector(
        ".dplayer-video-wrap"
      ) as HTMLElement;

      if (subtitleContainer && videoWrap) {
        subtitleContainer.style.position = "absolute";
        subtitleContainer.style.bottom = "8%";
        subtitleContainer.style.left = "50%";
        subtitleContainer.style.transform = "translateX(-50%)";
        subtitleContainer.style.maxWidth = "90%";
        subtitleContainer.style.pointerEvents = "none";

        // Append subtitle inside video wrap
        videoWrap.appendChild(subtitleContainer);
      }
    }, 500);

    (dp as any).on("timeupdate", () => {
      const currentTime = dp.video.currentTime;
      const skipIntroBtn = document.querySelector(".skip-intro-btn");
      const skipOutroBtn = document.querySelector(".skip-outro-btn");

      if (currentTime >= data.op_start_sec && currentTime <= data.op_end_sec) {
        skipIntroBtn?.classList.remove("hidden");
      } else {
        skipIntroBtn?.classList.add("hidden");
      }

      if (currentTime >= data.ed_start_sec && currentTime <= data.ed_end_sec) {
        skipOutroBtn?.classList.remove("hidden");
      } else {
        skipOutroBtn?.classList.add("hidden");
      }
    });

    document.querySelector(".skip-intro-btn")?.addEventListener("click", () => {
      dp.seek(data.op_end_sec);
    });

    document.querySelector(".skip-outro-btn")?.addEventListener("click", () => {
      dp.seek(data?.ed_end_sec);
      setTimeout(() => {
        triggerCountdown();
      }, 2000);
    });

    (dp as any).on("ended", handleEnd);
  }
};

const PlayerComponent = ({
  data,
  episodes,
  isMovie = false,
}: {
  data: any;
  episodes: any;
  isMovie: any;
}) => {
  const [mainData, setMainData] = useState<any>(data);
  const [subtitle, setSubtitle] = useState<any>(null);
  const [episodeData, setEpisodeData] = useState<any>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [initialAgain, setInitialAgain] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const fetchEpisodes = async () => {
    if (episodes) {
      const epList = await getAnimeList(episodes);
      setEpisodeData(epList);
    }
  };

  const fetchSubtitle = async () => {
    try {
      const response = await axios.post("/api/convert", {
        subUrl: mainData?.sub_url,
      });

      setSubtitle(response?.data);
    } catch (error) {
      setSubtitle(null);
    }
  };

  useEffect(() => {
    fetchEpisodes();
    fetchSubtitle();
  }, [mainData]);
  console.log(mainData, "mainData");
  useEffect(() => {
    const videoApiUrl = transformURL(
      mainData?.vid3 || mainData?.vid2 || mainData?.vid1 || ""
    );

    if (subtitle) {
      initPlayer(
        videoApiUrl,
        playerContainerRef,
        mainData,
        subtitle,
        startCountdown,
        startCountdown
      );
    } else {
      initPlayer(
        videoApiUrl,
        playerContainerRef,
        mainData,
        "",
        startCountdown,
        startCountdown
      );
    }
  }, [subtitle]);

  const startCountdown = () => {
    let timeLeft = COUNTDOWN_DURATION;
    setCountdown(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft === 0) {
        clearInterval(interval);
        playNextEpisode();
      }
    }, 1000);
  };

  const playNextEpisode = async () => {
    const nextEpisodeIndex =
      episodeData.findIndex((ep: any) => ep.id === mainData.id) + 1;
    if (nextEpisodeIndex < episodeData.length) {
      const nextEpisode = await getAnime(episodeData[nextEpisodeIndex].id);
      setMainData(nextEpisode);
      setCountdown(null);
    }
  };

  const handleSkipIntro = () => {
    const player: any = playerContainerRef.current?.querySelector("video");
    if (player) {
      player.currentTime = data.op_end_sec;
    }
  };
  const handleSkipOutro = () => {
    const player: any = playerContainerRef.current?.querySelector("video");
    if (player) {
      player.currentTime = data.ed_end_sec;
    }
  };

  return (
    <div className="w-full h-full md:h-screen block md:flex bg-black relative">
      <div className="w-full flex items-center justify-center h-full">
        <div
          ref={playerContainerRef}
          className="w-full md:full h-full  flex items-center justify-center bg-black relative"
        ></div>
      </div>

      <button
        onClick={handleSkipIntro}
        className="hidden skip-intro-btn absolute bottom-[60px] w-3/5 right-0 bg-red-500 px-4 py-2 text-white rounded-lg "
      >
        Skip Intro
      </button>
      <button
        onClick={handleSkipOutro}
        className="hidden skip-outro-btn absolute bottom-[60px] w-3/5 right-0 bg-red-500 px-4 py-2 text-white rounded-lg "
      >
        Skip Outro
      </button>
      <button
        onClick={() => {}}
        className=" absolute bottom-[60px] w-4/6 right-0 bg-red-500 px-4 py-2 text-white rounded-lg "
      >
        {countdown !== null && (
          <div className="">Next episode in {countdown}s...</div>
        )}
      </button>
      {!isMovie && (
        <div className="w-full md:w-1/4 h-full px-6 overflow-y-auto bg-gradient-to-t from-[#141414] to-transparent scrollbar-hide bg-[#161616] overflow-hidden">
          <div className="flex flex-col items-center sticky top-0 w-fit justify-center bg-[#161616] pt-6">
            <div className="relative w-full ">
              <div className="w-full absolute h-full top-6 z-[20] bg-[linear-gradient(40deg,_rgb(22,22,22)_24%,rgba(6,10,23,0)_57%),linear-gradient(0deg,_rgb(22,22,22)_4%,rgba(6,10,23,0)_69%)]"></div>
              <p className="absolute bottom-[10px] z-[20] px-[6px]">
                {data?.atitle}
              </p>
              <Image
                src={`https://playmax.mn/${data?.image}`}
                alt={data?.title}
                width={1080}
                height={400}
                objectFit="cover"
                className="rounded-lg w-full"
              />
            </div>

            <p className="text-white text-2xl mt-6">{data?.title}</p>
          </div>

          <div className=" mt-8 space-y-4 ">
            {episodeData?.map((episode: any) => (
              <Link href={`/anime/${episode.id}`}>
                <div
                  key={episode.id}
                  // onClick={() => {
                  //   setMainData(episode);
                  // }}
                  className={`flex items-center justify-center h-12 rounded-lg cursor-pointer ${
                    mainData.id === episode.id ? "bg-[#c43f3f]" : "bg-gray-800"
                  } hover:bg-red-500 transition-all duration-200`}
                >
                  <p className="text-white">{episode.number}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerComponent;
