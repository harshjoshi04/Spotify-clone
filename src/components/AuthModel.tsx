"use client";
import React, { useEffect } from "react";
import Model from "./Model";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModel from "@/hooks/useAuthModel";

const AuthModel = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModel();
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);
  const handleChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <>
      <Model
        title="Welcome Back"
        description="Login to your account"
        isOpen={isOpen}
        onChange={handleChange}
      >
        <Auth
          theme="dark"
          supabaseClient={supabaseClient}
          providers={["github"]}
          appearance={{
            theme: ThemeSupa,
          }}
        />
      </Model>
    </>
  );
};

export default AuthModel;
