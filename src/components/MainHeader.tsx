"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import Button from "./Button";
import useAuthModel from "@/hooks/useAuthModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
interface MainHeaderProps {
  children: React.ReactNode;
  className?: string;
}
const MainHeader: React.FC<MainHeaderProps> = ({ children, className }) => {
  const authModel = useAuthModel();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();
  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex  gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={30} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={30} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden  gap-x-2  items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-4 items-center">
              <Button onClick={handleLogOut} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <Button
                className="bg-transparent text-neutral-300 font-medium"
                onClick={() => {
                  authModel.onOpen();
                }}
              >
                SignUp
              </Button>
              <Button className="bg-white px-6 py-2" onClick={authModel.onOpen}>
                Log In
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainHeader;
