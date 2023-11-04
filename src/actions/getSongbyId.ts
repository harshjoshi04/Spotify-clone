import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../type";
import { cookies } from "next/headers";

const getSongsById = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: SessionData, error: SessionError } =
    await supabase.auth.getSession();
  if (SessionError) {
    console.log(SessionError.message);
    return [];
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", SessionData.session?.user.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getSongsById;
