// TODO: remove in future, for now was needed to live test
"use client";

import { useJokes } from "@/hooks/useJokes";
import { TextInput } from "./TextInput";

export const ComboBox = () => {
  const {
    jokes,
    search,
    setSearch,
    selectedJoke,
    // setSelectedJoke,
    isLoading,
    error,
  } = useJokes();

  return (
    <>
      <TextInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for jokes"
        rightSlot={isLoading ?? <div>Loading...</div>}
        errorMessage={error ?? ""}
      />
      <h2>
        {JSON.stringify({ jokes, search, selectedJoke, isLoading, error })}
      </h2>
    </>
  );
};
