"use client";

import { useCallback, useState } from "react";
import { Joke, useJokes } from "@/hooks/useJokes";
import { TextInput } from "./TextInput";
import { List } from "./List";
import { Popup } from "./Popup";
import { InputIndicator } from "./InputIndicator";

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
  const [popupOpen, setPopupOpen] = useState(false);

  const onClickJoke = useCallback(
    (joke: Joke) => {
      // Not regular combobox behaviour.
      // with selecting joke it's string value should be populated to the search
      // w/ api call.
      // But accroding to page 5 of pdf, it should work like this.
      setSelectedJoke(joke);
      setPopupOpen(false);
    },
    [setSelectedJoke]
  );

  return (
    <div className="w-full flex-col items-center gap-2">
      {selectedJoke && <h2>{selectedJoke.joke}</h2>}
      <div className="w-96 relative">
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for jokes"
          rightSlot={
            <InputIndicator
              isPopupOpen={popupOpen}
              isResultsLoading={isLoading}
            />
          }
          errorMessage={error ?? ""}
          onFocus={() => setPopupOpen(true)}
          onKeyDown={(e) => {
            // TODO: Adding keyboard nav for accessibility
            if (e.key === "Escape") {
              setPopupOpen(false);
              e.currentTarget.blur();
            }
          }}
        />
        <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
          <List
            jokes={jokes}
            selectedJoke={selectedJoke}
            setSelectedJoke={onClickJoke}
          />
        </Popup>
      </div>
    </div>
  );
};
