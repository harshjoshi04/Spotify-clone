"use client";
import usePlayer from "@/actions/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useSongLoad from "@/hooks/useSongLoad";
import React from "react";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player?.activeId);
  const song_url = useSongLoad(song!);
  if (!song || !song_url || !player.activeId) {
    return null;
  }
  return (
    <div className="fixed bottom-0  bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={song_url} songUrl={song_url} songs={song} />
    </div>
  );
};

export default Player;
