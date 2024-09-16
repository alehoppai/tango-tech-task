"use client";

import { useJokes } from "@/hooks/useJokes";
import { TextInput } from "./TextInput";
import { List } from "./List";

export const ComboBox = () => {
  const {
    jokes,
    search,
    setSearch,
    selectedJoke,
    setSelectedJoke,
    isLoading,
    error,
  } = useJokes();

  return (
    <div className="w-96">
      <TextInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for jokes"
        rightSlot={isLoading ?? <div>Loading...</div>}
        errorMessage={error ?? ""}
      />
      <List
        jokes={jokes}
        selectedJoke={selectedJoke}
        setSelectedJoke={setSelectedJoke}
      />
      {/* <h2>
        {JSON.stringify({ jokes, search, selectedJoke, isLoading, error })}
      </h2> */}
    </div>
  );
};
