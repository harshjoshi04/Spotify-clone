import getSongByTitle from "@/actions/getSongbyTitle";
import MainHeader from "@/components/MainHeader";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";
import React from "react";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Home = async ({ searchParams }: SearchProps) => {
  const songs = await getSongByTitle(searchParams.title);
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <MainHeader className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            <SearchInput />
          </h1>
        </div>
      </MainHeader>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Home;
