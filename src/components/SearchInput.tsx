"use client";
import useDebounce from "@/hooks/useDebounce";
import qs from "query-string";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setvalue] = useState<string>("");
  const debounceValue = useDebounce<string>(value, 500);
  useEffect(() => {
    const query = {
      title: debounceValue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debounceValue, router]);
  return (
    <div>
      <Input
        type="search"
        placeholder="What do you want to listen to ?"
        value={value}
        className="font-medium"
        onChange={(e) => setvalue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
