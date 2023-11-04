import useAuthModal from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LiekProps {
  songId: string;
}

const LikeButton: React.FC<LiekProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModel = useAuthModal();
  const { user } = useUser();
  const [isLike, setisLike] = useState(false);
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    (async () => {
      const { data, error } = await supabaseClient
        .from("liked_song")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", songId);
      if (!error && data.length) {
        setisLike(true);
      }
    })();
  }, [songId, supabaseClient, user?.id]);
  const Icon = isLike ? AiFillHeart : AiOutlineHeart;
  const handleLike = async () => {
    if (!user) {
      return authModel.onOpen();
    }
    if (isLike) {
      const { error } = await supabaseClient
        .from("liked_song")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", songId);
      if (error) {
        toast.error(error.message);
      } else {
        setisLike(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_song").insert({
        song_id: songId,
        user_id: user?.id,
      });
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        setisLike(true);
        toast.success("Liked!");
      }
    }
    router.refresh();
  };
  return (
    <button className="hover:opacity-75 transition " onClick={handleLike}>
      <Icon color={isLike ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
