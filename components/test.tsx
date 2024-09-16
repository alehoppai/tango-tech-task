// TODO: remove in future, for now was needed to live test
"use client";

import { useJokes } from "@/hooks/useJokes";
import { useEffect } from "react";

export const Test = () => {
  const {
    jokes,
    search,
    setSearch,
    selectedJoke,
    // setSelectedJoke,
    isLoading,
    error,
  } = useJokes();

  useEffect(() => {
    setSearch("zed");
  }, []);

  return (
    <h2>{JSON.stringify({ jokes, search, selectedJoke, isLoading, error })}</h2>
  );
};
