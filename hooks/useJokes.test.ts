import { renderHook, act } from "@testing-library/react";
import { useJokes } from "./useJokes";
import { useGet } from "./useGet";
import { describe, test, expect, vi, beforeEach } from "vitest";

vi.mock("./useGet", () => ({
  useGet: vi.fn(),
}));

vi.mock("use-debounce", () => ({
  useDebounce: vi.fn((value) => [value]),
}));

describe("useJokes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should initialize with default values", () => {
    vi.mocked(useGet).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useJokes());

    expect(result.current.jokes).toEqual([]);
    expect(result.current.search).toBe("");
    expect(result.current.selectedJoke).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("should update search and fetch jokes", async () => {
    const mockJokes = {
      results: [{ id: "1", joke: "Test joke" }],
      current_page: 1,
      limit: 20,
      next_page: 2,
      previous_page: 0,
    };

    vi.mocked(useGet).mockReturnValue({
      data: mockJokes,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useJokes());

    act(() => {
      result.current.setSearch("test");
    });

    expect(result.current.search).toBe("test");
    expect(result.current.jokes).toEqual(mockJokes.results);
  });

  test("should handle loading state", () => {
    vi.mocked(useGet).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useJokes());

    expect(result.current.isLoading).toBe(true);
  });

  test("should handle error state", () => {
    const errorMessage = "An error occurred";
    vi.mocked(useGet).mockReturnValue({
      data: null,
      isLoading: false,
      error: errorMessage,
    });

    const { result } = renderHook(() => useJokes());

    expect(result.current.error).toBe(errorMessage);
  });

  test("should set and update selected joke", () => {
    vi.mocked(useGet).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useJokes());

    const joke = { id: "1", joke: "Selected joke" };

    act(() => {
      result.current.setSelectedJoke(joke);
    });

    expect(result.current.selectedJoke).toEqual(joke);
  });
});
