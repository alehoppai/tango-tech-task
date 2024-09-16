import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useGet } from "./useGet";

type Joke = {
  id: string;
  joke: string;
};

type PaginatedResponse<T> = {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: T[];
};

export const useJokes = () => {
  const [search, setSearch] = useState("");
  const [selectedJoke, setSelectedJoke] = useState<Joke | null>(null);
  const [debouncedSearch] = useDebounce(search, 300);
  const {
    data: paginatedResponse,
    isLoading,
    error,
  } = useGet<PaginatedResponse<Joke>>({ term: debouncedSearch });

  const jokes = paginatedResponse?.results || [];

  return useMemo(
    () => ({
      jokes,
      search,
      setSearch,
      selectedJoke,
      setSelectedJoke,
      isLoading,
      error,
    }),
    [jokes, search, selectedJoke, isLoading, error]
  );
};
