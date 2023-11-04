"use client";
import React, { useEffect } from "react";
import { Song } from "../../type";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProp {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProp> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked Songs.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((item) => {
        return (
          <div key={item.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem onClick={(id: string) => onPlay(id)} data={item} />
            </div>
            <LikeButton songId={item.id} />
          </div>
        );
      })}
    </div>
  );
};

export default LikedContent;
