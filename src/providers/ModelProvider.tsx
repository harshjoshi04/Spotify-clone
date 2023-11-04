"use client";
import React, { useEffect, useState } from "react";
import AuthModel from "@/components/AuthModel";
import UploadModel from "@/components/UploadModel";

const ModelProvider = () => {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModel />
      <UploadModel />
    </>
  );
};

export default ModelProvider;
