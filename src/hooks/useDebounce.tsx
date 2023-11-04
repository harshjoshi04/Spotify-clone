"use client";
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debounce, setdebounce] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounce(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounce;
}

export default useDebounce;
