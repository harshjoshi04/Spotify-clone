"use client";
import React from "react";
import { Song } from "../../type";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProp {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProp> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 px-6 text-neutral-400 w-full">
        No songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((item) => {
        return (
          <div key={item.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem data={item} onClick={(id: string) => onPlay(id)} />
            </div>
            <LikeButton songId={item?.id} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
