import { useEffect, useMemo, useState } from "react";
import { Song } from "../../type";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
  const [isLoading, setisLoading] = useState(false);
  const [song, setsong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setisLoading(true);
    (async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      setisLoading(false);
      if (error) {
        return toast.error(error.message);
      }
      setsong(data as Song);
    })();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
