"use client";
import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import useUploadModel from "@/hooks/useUploadModel";
import { Song } from "../../type";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModel = useAuthModal();
  const uploadModel = useUploadModel();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const handleOnClick = () => {
    if (!user) {
      return authModel.onOpen();
    }
    return uploadModel.onOpen();
  };
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between  px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={20} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md ">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleOnClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => {
          return (
            <MediaItem
              data={item}
              onClick={(id: string) => onPlay(id)}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
