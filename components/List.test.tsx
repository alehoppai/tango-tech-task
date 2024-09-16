import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { List, ListItem } from "./List";
import { describe, test, expect, vi, beforeEach } from "vitest";

describe("ListItem", () => {
  beforeEach(() => {
    cleanup();
  });
  const mockJoke = { id: "1", joke: "Test joke" };
  const mockOnSelect = vi.fn();

  test("renders joke text", () => {
    render(
      <ListItem joke={mockJoke} isSelected={false} onSelect={mockOnSelect} />
    );
    expect(screen.getByText("Test joke")).toBeInTheDocument();
  });

  test("calls onSelect when clicked", () => {
    render(
      <ListItem joke={mockJoke} isSelected={false} onSelect={mockOnSelect} />
    );
    screen.logTestingPlaygroundURL();
    fireEvent.click(screen.getByText("Test joke"));
    expect(mockOnSelect).toHaveBeenCalledWith(mockJoke);
  });

  test("applies selected class when isSelected is true", () => {
    render(
      <ListItem joke={mockJoke} isSelected={true} onSelect={mockOnSelect} />
    );
    expect(screen.getByText("Test joke")).toHaveClass("bg-blue-500/25");
  });
});

describe("List", () => {
  beforeEach(() => {
    cleanup();
  });

  const mockJokes = [
    { id: "1", joke: "Joke 1" },
    { id: "2", joke: "Joke 2" },
  ];
  const mockSetSelectedJoke = vi.fn();

  test("renders list of jokes", () => {
    render(
      <List
        jokes={mockJokes}
        selectedJoke={null}
        setSelectedJoke={mockSetSelectedJoke}
      />
    );
    expect(screen.getByText("Joke 1")).toBeInTheDocument();
    expect(screen.getByText("Joke 2")).toBeInTheDocument();
  });

  test("renders 'No jokes found' when jokes array is empty", () => {
    render(
      <List
        jokes={[]}
        selectedJoke={null}
        setSelectedJoke={mockSetSelectedJoke}
      />
    );
    expect(screen.getByText("No jokes found")).toBeInTheDocument();
  });

  test("calls setSelectedJoke when a joke is clicked", () => {
    render(
      <List
        jokes={mockJokes}
        selectedJoke={null}
        setSelectedJoke={mockSetSelectedJoke}
      />
    );
    fireEvent.click(screen.getByText("Joke 1"));
    expect(mockSetSelectedJoke).toHaveBeenCalledWith(mockJokes[0]);
  });
});
