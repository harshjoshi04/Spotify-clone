import { Song } from "../../type";
import usePlayer from "@/actions/usePlayer";
import useAuthModal from "./useAuthModel";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authmodel = useAuthModal();
  const { user } = useUser();
  const OnPlay = (id: string) => {
    if (!user) {
      return authmodel.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((songs) => songs.id));
  };
  return OnPlay;
};

export default useOnPlay;
