import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { ComboBox } from "./ComboBox";
import { useJokes } from "@/hooks/useJokes";
import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock the useJokes hook
vi.mock("@/hooks/useJokes", () => ({
  useJokes: vi.fn(),
}));

// Mock the child components
vi.mock("./TextInput", () => ({
  TextInput: vi.fn(({ onFocus, onKeyDown, onChange }) => (
    <input
      data-testid="mock-text-input"
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  )),
}));

vi.mock("./List", () => ({
  List: vi.fn(() => <div data-testid="mock-list" />),
}));

vi.mock("./Popup", () => ({
  Popup: vi.fn(({ children, open }) => (
    <div data-testid="mock-popup" data-open={open}>
      {children}
    </div>
  )),
}));

describe("ComboBox", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders ComboBox with initial state", () => {
    vi.mocked(useJokes).mockReturnValue({
      jokes: [],
      search: "",
      setSearch: vi.fn(),
      selectedJoke: null,
      setSelectedJoke: vi.fn(),
      isLoading: false,
      error: null,
    });

    render(<ComboBox />);

    expect(screen.getByTestId("mock-text-input")).toBeInTheDocument();
    expect(screen.getByTestId("mock-popup")).toBeInTheDocument();
    expect(screen.getByTestId("mock-list")).toBeInTheDocument();
  });

  test("displays selected joke when available", () => {
    const selectedJoke = { id: "1", joke: "Test joke" };
    vi.mocked(useJokes).mockReturnValue({
      jokes: [],
      search: "",
      setSearch: vi.fn(),
      selectedJoke,
      setSelectedJoke: vi.fn(),
      isLoading: false,
      error: null,
    });

    render(<ComboBox />);

    expect(screen.getByText("Test joke")).toBeInTheDocument();
  });

  test("opens popup on input focus", async () => {
    vi.mocked(useJokes).mockReturnValue({
      jokes: [],
      search: "",
      setSearch: vi.fn(),
      selectedJoke: null,
      setSelectedJoke: vi.fn(),
      isLoading: false,
      error: null,
    });

    render(<ComboBox />);

    const input = screen.getByTestId("mock-text-input");
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByTestId("mock-popup")).toHaveAttribute(
        "data-open",
        "true"
      );
    });
  });

  test("closes popup on Escape key press", async () => {
    vi.mocked(useJokes).mockReturnValue({
      jokes: [],
      search: "",
      setSearch: vi.fn(),
      selectedJoke: null,
      setSelectedJoke: vi.fn(),
      isLoading: false,
      error: null,
    });

    render(<ComboBox />);

    const input = screen.getByTestId("mock-text-input");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "Escape" });

    await waitFor(() => {
      expect(screen.getByTestId("mock-popup")).toHaveAttribute(
        "data-open",
        "false"
      );
    });
  });

  test("updates search value on input change", () => {
    const setSearchMock = vi.fn();
    vi.mocked(useJokes).mockReturnValue({
      jokes: [],
      search: "",
      setSearch: setSearchMock,
      selectedJoke: null,
      setSelectedJoke: vi.fn(),
      isLoading: false,
      error: null,
    });

    render(<ComboBox />);

    const input = screen.getByTestId("mock-text-input");
    fireEvent.change(input, { target: { value: "test" } });

    expect(setSearchMock).toHaveBeenCalledWith("test");
  });

  // TODO: loading state cover / error state cover
});
