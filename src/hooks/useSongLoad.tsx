import React from "react";
import { Song } from "../../type";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useSongLoad = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) {
    return;
  }
  const { data: SongData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return SongData.publicUrl;
};

export default useSongLoad;
