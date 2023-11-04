"use client";
import { MyUserContextProvider } from "@/hooks/useUser";
import React from "react";

interface UserProviderProp {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProp> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
