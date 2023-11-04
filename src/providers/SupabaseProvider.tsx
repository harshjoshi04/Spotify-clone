"use client";
import React from "react";
import { Database } from "../../types.db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
  children: React.ReactNode;
}
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supClient = createClientComponentClient<Database>();
  return (
    <SessionContextProvider supabaseClient={supClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
