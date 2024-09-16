import { Joke } from "@/hooks/useJokes";

type ListItemProps = {
  joke: Joke;
  isSelected: boolean;
  onSelect: (joke: Joke) => void;
};
export const ListItem = ({ joke, isSelected, onSelect }: ListItemProps) => (
  <li className="w-full">
    <button
      className={`py-2 px-4 w-full truncate hover:text-blue-500 rounded-xl ${
        isSelected ? "text-blue-500 bg-blue-500/25" : ""
      }`}
      onClick={() => onSelect(joke)}
    >
      {joke.joke}
    </button>
  </li>
);

type ListProps = {
  jokes: Joke[];
  selectedJoke: Joke | null;
  setSelectedJoke: (joke: Joke) => void;
};
export const List = ({ jokes, selectedJoke, setSelectedJoke }: ListProps) =>
  !jokes.length ? (
    <div className="w-full flex-col p-2">No jokes found</div>
  ) : (
    <ul className="w-full flex-col py-2">
      {jokes.map((joke) => (
        <ListItem
          key={joke.id}
          joke={joke}
          isSelected={joke.id === selectedJoke?.id}
          onSelect={setSelectedJoke}
        />
      ))}
    </ul>
  );
