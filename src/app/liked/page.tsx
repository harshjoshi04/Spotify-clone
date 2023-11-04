import getLikedSong from "@/actions/getLikedSong";
import LikedContent from "@/components/LikedContent";
import MainHeader from "@/components/MainHeader";
import Image from "next/image";
import React from "react";

export const revalidate = 0;

const Home = async () => {
  const songs = await getLikedSong();
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <MainHeader>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                src="/image/liked.png"
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold ">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </MainHeader>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Home;
