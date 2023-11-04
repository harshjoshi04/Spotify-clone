import React, { useState } from "react";
import Model from "./Model";
import uniqid from "uniqid";
import useUploadModel from "@/hooks/useUploadModel";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModel = () => {
  const [isLoading, setisLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const uploadModel = useUploadModel();
  const handleChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModel.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log("Starting");
      setisLoading(true);
      const SongFile = data.song?.[0];
      const ImageFile = data.image?.[0];
      if (!ImageFile || !SongFile || !user) {
        toast.error("Missing fields");
        return;
      }
      const uniqueId = uniqid();
      const { data: SongData, error: SongError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${data.title}-${uniqueId}`, SongFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (SongError) {
        setisLoading(false);
        return toast.error("Failed Song Upload.");
      }

      //   Upload Image
      const { data: ImageData, error: ImageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${data.title}-${uniqueId}`, ImageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (ImageError) {
        setisLoading(false);
        return toast.error("Failed Image Upload.");
      }
      const { error: SupabasError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: data.title,
          author: data.author,
          image_path: ImageData.path,
          song_path: SongData.path,
        });
      if (SupabasError) {
        setisLoading(false);
        return toast.error(SupabasError.message);
      }
      router.refresh();
      setisLoading(false);
      toast.success("Song Created!");
      reset();
      uploadModel.onClose();
    } catch (er) {
      toast.error("Someting went wrong !");
    } finally {
      setisLoading(true);
    }
  };
  return (
    <Model
      title="Add a Song"
      description="Upload an mp3 file"
      onChange={handleChange}
      isOpen={uploadModel.isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          placeholder="Song Title"
          {...register("title", { required: true })}
          disabled={isLoading}
        />
        <Input
          id="author"
          placeholder="Song Author"
          {...register("author", { required: true })}
          disabled={isLoading}
        />
        <div>
          <div className="pb-1">Select Song File</div>
          <Input
            id="song"
            type="file"
            {...register("song", { required: true })}
            className="cursor-pointer"
            accept=".mp3"
            disabled={isLoading}
          />
        </div>
        <div>
          <div className="pb-1">Select Image</div>
          <Input
            id="image"
            type="file"
            {...register("image", { required: true })}
            className="cursor-pointer"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} className="mt-1" type="submit">
          Create
        </Button>
      </form>
    </Model>
  );
};

export default UploadModel;
