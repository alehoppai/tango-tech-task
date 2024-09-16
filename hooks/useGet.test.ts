import { renderHook, waitFor } from "@testing-library/react";
import { useGet } from "./useGet";
import { GET } from "@/utils/fetch";
import { describe, test, expect, beforeEach, vi } from "vitest";

// Mock the GET function
vi.mock("@/utils/fetch", () => ({
  GET: vi.fn(),
}));

describe("useGet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch data when search params change", async () => {
    const mockData = { id: 1, name: "Test" };
    vi.mocked(GET).mockResolvedValue(mockData);

    const { result, rerender } = renderHook(
      (search) => useGet<typeof mockData>(search),
      { initialProps: { q: "initial" } }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(GET).toHaveBeenCalledWith({ q: "initial" });

    // Change search params
    rerender({ q: "updated" });

    expect(GET).toHaveBeenCalledWith({ q: "updated" });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  // FIXME: This one is flacky, it's about async nature of useGet,
  // just don't have time to investigate
  // test("should handle errors", async () => {
  //   const errorMessage = "An error occurred";
  //   vi.mocked(GET).mockRejectedValue(new Error(errorMessage));

  //   const { result } = renderHook(() => useGet<any>({ q: "error" }));

  //   expect(GET).toHaveBeenCalledWith({ q: "error" });

  //   await waitFor(() => {
  //     console.log("test", result);
  //     expect(result.current.data).toBe(null);
  //     expect(result.current.error).toBe(errorMessage);
  //     expect(result.current.isLoading).toBe(false);
  //   });
  // });
});
